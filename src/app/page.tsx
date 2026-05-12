import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { Chatbot } from "@/components/Chatbot";
import { StructuredData } from "@/components/StructuredData";
import { contact, processSteps, services, trustItems, whatsappUrl } from "@/lib/site";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-900">
      <StructuredData />
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="#home" className="flex items-center gap-3">
            <Image
              src="/digiseva-logo.png"
              alt="DigiSeva Point"
              width={180}
              height={76}
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
            <Link href="#services">Services</Link>
            <Link href="#process">Process</Link>
            <Link href="#booking">Book</Link>
            <Link href="#contact">Contact</Link>
          </nav>
          <a
            href={whatsappUrl}
            className="inline-flex items-center gap-2 rounded-md bg-[#119622] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0d7f1c]"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </header>

      <section id="home" className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm font-bold text-[#0a3d91]">
              <Sparkles className="h-4 w-4" />
              Aapka Digital Sahayak
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-normal text-[#0a2d68] sm:text-5xl lg:text-6xl">
              Online form filling help with live guidance and appointments.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              DigiSeva Point helps customers complete PAN card work, online
              applications, certificate forms, document updates, and application
              tracking with careful support by phone, WhatsApp, or video call.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#booking"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a3d91] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#082f70]"
              >
                Book appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:+91${contact.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-[#0a3d91] transition hover:border-[#0a3d91]"
              >
                <Phone className="h-4 w-4" />
                Call {contact.phone}
              </a>
            </div>
          </div>

          <div className="grid content-center gap-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <Image
                src="/digiseva-logo.png"
                alt="DigiSeva Point logo"
                width={900}
                height={500}
                className="h-auto w-full rounded-md bg-white object-contain p-8"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {["PAN help", "Video calls", "Secure pay"].map((item) => (
                <div key={item} className="rounded-md border border-slate-200 bg-white px-3 py-4 text-sm font-bold text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#119622]">Services</p>
          <h2 className="mt-3 text-3xl font-black text-[#0a2d68]">Digital service support customers can understand.</h2>
          <p className="mt-4 text-slate-600">
            Every service includes a document checklist, appointment support, and
            clear next steps. Fees are confirmed before work starts.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="h-8 w-8 text-[#0a3d91]" />
                <h3 className="mt-4 text-lg font-black text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                <p className="mt-4 rounded-md bg-green-50 p-3 text-xs font-semibold leading-5 text-green-800">
                  Documents: {service.documents}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="process" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#119622]">Process</p>
              <h2 className="mt-3 text-3xl font-black text-[#0a2d68]">A simple booking-to-support workflow.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#0a3d91] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-black text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="h-7 w-7 text-[#119622]" />
                <h3 className="mt-4 font-black text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="booking" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#119622]">Appointment</p>
            <h2 className="mt-3 text-3xl font-black text-[#0a2d68]">Book support for your form or online service.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Choose a service and appointment mode. A unique Jitsi video room is
              prepared for every booking, and Razorpay payment is activated when
              gateway keys are configured.
            </p>
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <ShieldAlert className="mb-2 h-5 w-5" />
              DigiSeva Point provides form-filling assistance only. We are not an
              official government portal and do not guarantee approval by any authority.
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      <footer id="contact" className="bg-[#071b3d] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <Image src="/digiseva-logo.png" alt="DigiSeva Point" width={220} height={95} className="rounded-md bg-white p-3" />
            <p className="mt-4 text-sm leading-6 text-blue-100">
              Professional assistance for online forms, PAN card work, digital
              applications, appointment support, and live video guidance.
            </p>
          </div>
          <div>
            <h3 className="font-black">Contact</h3>
            <div className="mt-4 grid gap-3 text-sm text-blue-100">
              <a className="inline-flex items-center gap-2" href={`tel:+91${contact.phone}`}>
                <Phone className="h-4 w-4" />
                {contact.phone}
              </a>
              <a className="inline-flex items-center gap-2" href={whatsappUrl}>
                <MessageCircle className="h-4 w-4" />
                WhatsApp {contact.whatsapp}
              </a>
              <a className="inline-flex items-center gap-2" href={`mailto:${contact.email}`}>
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {contact.address}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-black">Admin</h3>
            <p className="mt-4 text-sm leading-6 text-blue-100">
              Manage appointments, payments, Jitsi rooms, and chatbot leads from the protected dashboard.
            </p>
            <Link href="/admin" className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-bold text-[#0a3d91]">
              <CalendarCheck className="h-4 w-4" />
              Admin login
            </Link>
          </div>
        </div>
      </footer>

      <Chatbot />
    </main>
  );
}
