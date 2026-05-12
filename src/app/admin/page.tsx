import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminDashboard } from "@/components/AdminDashboard";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f7fafc] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#0a3d91]">
          <ArrowLeft className="h-4 w-4" />
          Back to website
        </Link>
        <div className="mt-8 mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#119622]">Admin</p>
          <h1 className="mt-2 text-3xl font-black text-[#0a2d68]">DigiSeva Point dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            View customer bookings, update appointment status, and open Jitsi
            support rooms after Supabase Auth is configured.
          </p>
        </div>
        <AdminDashboard
          supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}
          supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}
        />
      </div>
    </main>
  );
}
