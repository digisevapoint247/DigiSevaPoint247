import { NextResponse } from "next/server";
import { contact } from "@/lib/site";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createJitsiRoom, validateAppointment } from "@/lib/validation";

const defaultFeePaise = 9900;

export async function POST(request: Request) {
  const body = await request.json();
  const validation = validateAppointment(body);

  if (!validation.isValid) {
    return NextResponse.json(
      { message: "Please check the booking form.", errors: validation.errors },
      { status: 400 },
    );
  }

  const jitsiRoom = createJitsiRoom(body.name);
  const jitsiUrl = `https://meet.jit.si/${jitsiRoom}`;
  const supabase = getSupabaseAdmin();
  const appointmentPayload = {
    customer_name: body.name.trim(),
    phone: body.phone.replace(/\D/g, ""),
    email: body.email?.trim() || null,
    service: body.service,
    appointment_date: body.date,
    appointment_time: body.time,
    mode: body.mode,
    notes: body.notes?.trim() || null,
    consent: true,
    status: "payment_pending",
    jitsi_room: jitsiRoom,
    jitsi_url: jitsiUrl,
    amount_paise: defaultFeePaise,
  };

  let appointmentId = `demo-${crypto.randomUUID().slice(0, 8)}`;

  if (supabase) {
    const { data, error } = await supabase
      .from("appointments")
      .insert(appointmentPayload)
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { message: "Could not save appointment. Please try WhatsApp instead.", detail: error.message },
        { status: 500 },
      );
    }

    appointmentId = data.id;
  }

  let payment = {
    enabled: false,
    message: `Razorpay is not configured yet. Please pay after confirmation by calling or WhatsApp ${contact.whatsapp}.`,
  };

  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const order = await razorpay.orders.create({
      amount: defaultFeePaise,
      currency: "INR",
      receipt: appointmentId,
      notes: {
        appointmentId,
        service: body.service,
      },
    });

    if (supabase) {
      await supabase.from("payments").insert({
        appointment_id: appointmentId,
        provider: "razorpay",
        order_id: order.id,
        amount_paise: defaultFeePaise,
        currency: "INR",
        status: "created",
      });
    }

    payment = {
      enabled: true,
      message: "Razorpay order created.",
      ...({ orderId: order.id, amount: defaultFeePaise, currency: "INR" } as Record<string, string | number>),
    };
  }

  return NextResponse.json({
    appointmentId,
    jitsiRoom,
    jitsiUrl,
    payment,
    storedInSupabase: Boolean(supabase),
  });
}
