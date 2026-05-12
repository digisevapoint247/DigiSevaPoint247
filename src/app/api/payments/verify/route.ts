import crypto from "crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const {
    appointmentId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = await request.json();

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ message: "Razorpay secret is not configured." }, { status: 503 });
  }

  if (!appointmentId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ message: "Missing payment verification fields." }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ message: "Invalid payment signature." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    await supabase
      .from("payments")
      .update({
        payment_id: razorpay_payment_id,
        signature: razorpay_signature,
        status: "paid",
      })
      .eq("order_id", razorpay_order_id);

    await supabase
      .from("appointments")
      .update({ status: "confirmed" })
      .eq("id", appointmentId);
  }

  return NextResponse.json({ verified: true, status: "confirmed" });
}
