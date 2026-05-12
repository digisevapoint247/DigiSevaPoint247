import { NextResponse } from "next/server";
import OpenAI from "openai";
import { contact, serviceNames, whatsappUrl } from "@/lib/site";
import { getSupabaseAdmin } from "@/lib/supabase";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

function fallbackAnswer(input: string) {
  const lower = input.toLowerCase();

  if (lower.includes("pan")) {
    return "For PAN card assistance, we can help with new PAN, correction, reprint, and status guidance. Please keep Aadhaar, photo, signature, mobile number, and email ready. You can book an appointment on this page.";
  }

  if (lower.includes("document") || lower.includes("docs")) {
    return "Documents depend on the service. Commonly needed items are Aadhaar, address proof, photo, signature, registered mobile, email, and application/reference number. We do not collect uploads on the website in V1.";
  }

  if (lower.includes("pay") || lower.includes("fee") || lower.includes("price")) {
    return "Fees are confirmed before work starts. Razorpay online payment is prepared on the website; if it is not enabled yet, DigiSeva Point will confirm payment through phone or WhatsApp.";
  }

  if (lower.includes("call") || lower.includes("appointment") || lower.includes("book")) {
    return `You can book an appointment from the booking section. For direct support, call ${contact.phone} or WhatsApp ${contact.whatsapp}.`;
  }

  return `I can help with DigiSeva Point services, documents, appointments, payments, and video support. For direct help, WhatsApp us here: ${whatsappUrl}`;
}

export async function POST(request: Request) {
  const { messages = [] } = (await request.json()) as { messages: ChatMessage[] };
  const lastUserMessage =
    [...messages].reverse().find((message) => message.role === "user")?.content ?? "";

  if (!lastUserMessage.trim()) {
    return NextResponse.json({ message: "Please ask a question about DigiSeva Point services." });
  }

  const supabase = getSupabaseAdmin();

  if (!process.env.OPENAI_API_KEY) {
    const message = fallbackAnswer(lastUserMessage);
    if (supabase) {
      await supabase.from("chat_messages").insert({
        role: "assistant",
        content: message,
        source: "fallback",
      });
    }
    return NextResponse.json({ message, mode: "fallback" });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: process.env.OPENAI_CHAT_MODEL ?? "gpt-5.4-mini",
    input: [
      {
        role: "system",
        content: [
          "You are DigiSeva Point's website assistant.",
          "Answer only about DigiSeva services, document checklists, appointments, payment process, privacy, contact details, and video support.",
          "Do not claim DigiSeva Point is a government portal. Say it provides assistance only.",
          `Services: ${serviceNames.join(", ")}.`,
          `Contact: phone ${contact.phone}, WhatsApp ${contact.whatsapp}, email ${contact.email}.`,
          "If the request is unrelated, politely redirect to booking or contact.",
        ].join(" "),
      },
      ...messages.slice(-8).map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ],
  });

  const message = response.output_text || fallbackAnswer(lastUserMessage);

  if (supabase) {
    await supabase.from("chat_messages").insert([
      { role: "user", content: lastUserMessage, source: "website" },
      { role: "assistant", content: message, source: "openai" },
    ]);
  }

  return NextResponse.json({ message, mode: "openai" });
}
