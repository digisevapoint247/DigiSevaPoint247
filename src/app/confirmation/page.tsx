import Link from "next/link";
import { CheckCircle2, Home } from "lucide-react";
import { contact, whatsappUrl } from "@/lib/site";

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-[#f7fafc] px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#119622]" />
        <h1 className="mt-4 text-3xl font-black text-[#0a2d68]">Appointment request received</h1>
        <p className="mt-4 leading-7 text-slate-600">
          Thank you for choosing DigiSeva Point. We will confirm your booking,
          payment, and video call details shortly. For urgent support, call or
          WhatsApp {contact.phone}.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a className="rounded-md bg-[#119622] px-5 py-3 text-sm font-bold text-white" href={whatsappUrl}>
            Open WhatsApp
          </a>
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-[#0a3d91]"
            href="/"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
