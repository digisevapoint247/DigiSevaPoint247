"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { CalendarClock, ExternalLink, Lock, RefreshCcw } from "lucide-react";

type Appointment = {
  id: string;
  customer_name: string;
  phone: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  mode: string;
  status: string;
  jitsi_url: string;
};

export function AdminDashboard({
  supabaseUrl,
  supabaseAnonKey,
}: {
  supabaseUrl: string;
  supabaseAnonKey: string;
}) {
  const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);
  const supabase = useMemo<SupabaseClient | null>(
    () => (isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null),
    [isConfigured, supabaseAnonKey, supabaseUrl],
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [message, setMessage] = useState("");

  const loadAppointments = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("appointments")
      .select("id,customer_name,phone,service,appointment_date,appointment_time,mode,status,jitsi_url")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      setMessage(error.message);
      return;
    }

    setAppointments(data ?? []);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsLoggedIn(true);
        loadAppointments();
      }
    });
  }, [loadAppointments, supabase]);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      return;
    }

    setIsLoggedIn(true);
    setMessage("");
    await loadAppointments();
  }

  async function updateStatus(id: string, status: string) {
    if (!supabase) return;
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (error) {
      setMessage(error.message);
      return;
    }
    await loadAppointments();
  }

  if (!isConfigured) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-900">
        <Lock className="mb-3 h-6 w-6" />
        Add Supabase environment variables to activate admin login:
        <code className="mt-3 block rounded-md bg-white p-3 text-sm text-slate-800">
          NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
        </code>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <form onSubmit={login} className="grid max-w-md gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <label className="text-sm font-semibold text-slate-700" htmlFor="admin-email">
            Admin email
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700" htmlFor="admin-password">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a3d91] px-4 py-3 text-sm font-bold text-white">
          <Lock className="h-4 w-4" />
          Login
        </button>
        {message ? <p className="text-sm text-red-700">{message}</p> : null}
      </form>
    );
  }

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-xl font-black text-[#0a2d68]">
          <CalendarClock className="h-5 w-5" />
          Appointments
        </h2>
        <button
          onClick={loadAppointments}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {message ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{message}</p> : null}

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Schedule</th>
              <th className="px-4 py-3">Mode</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Call</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <p className="font-bold">{appointment.customer_name}</p>
                  <p className="text-slate-500">{appointment.phone}</p>
                </td>
                <td className="px-4 py-3">{appointment.service}</td>
                <td className="px-4 py-3">
                  {appointment.appointment_date} at {appointment.appointment_time}
                </td>
                <td className="px-4 py-3">{appointment.mode}</td>
                <td className="px-4 py-3">
                  <select
                    value={appointment.status}
                    onChange={(event) => updateStatus(appointment.id, event.target.value)}
                    className="rounded-md border border-slate-300 px-2 py-1"
                  >
                    {["new", "payment_pending", "confirmed", "completed", "cancelled"].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <a href={appointment.jitsi_url} target="_blank" className="inline-flex items-center gap-1 font-bold text-[#0a3d91]">
                    Open
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </td>
              </tr>
            ))}
            {appointments.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={6}>
                  No appointments yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
