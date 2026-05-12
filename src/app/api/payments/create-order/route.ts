import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json(
      { message: "Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
      { status: 503 },
    );
  }

  const { appointmentId, amountPaise = 9900 } = await request.json();
  if (!appointmentId) {
    return NextResponse.json({ message: "appointmentId is required." }, { status: 400 });
  }

  const Razorpay = (await import("razorpay")).default;
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt: appointmentId,
  });

  const supabase = getSupabaseAdmin();
  if (supabase) {
    await supabase.from("payments").insert({
      appointment_id: appointmentId,
      provider: "razorpay",
      order_id: order.id,
      amount_paise: amountPaise,
      currency: "INR",
      status: "created",
    });
  }

  return NextResponse.json({
    keyId: process.env.RAZORPAY_KEY_ID,
    orderId: order.id,
    amount: amountPaise,
    currency: "INR",
  });
}
