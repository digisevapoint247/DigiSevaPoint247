"use client";

import { useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const starter: Message = {
  role: "assistant",
  content:
    "Namaste, I am DigiSeva Assistant. Ask me about services, documents needed, appointments, payments, or video support.",
};

export function Chatbot() {
  const isStaticHosting = process.env.NEXT_PUBLIC_STATIC_HOSTING === "true";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([starter]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, content: prompt }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    if (isStaticHosting) {
      const answer = getStaticAnswer(prompt);
      setMessages([...nextMessages, { role: "assistant", content: answer }]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.message ?? "Please call or WhatsApp 8269805682 for support.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "I could not connect right now. Please WhatsApp 8269805682.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <section className="mb-3 flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between bg-[#0a3d91] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <p className="text-sm font-bold">DigiSeva Assistant</p>
                <p className="text-xs text-blue-100">Service guidance and booking help</p>
              </div>
            </div>
            <button aria-label="Close chatbot" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-lg px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "bg-white text-slate-700 shadow-sm"
                    : "ml-auto bg-[#119622] text-white"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading ? (
              <div className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking...
              </div>
            ) : null}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 border-t border-slate-200 p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="Ask about PAN, forms, documents..."
            />
            <button
              type="submit"
              aria-label="Send message"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#0a3d91] text-white"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      ) : null}

      <button
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#119622] text-white shadow-xl transition hover:bg-[#0d7f1c]"
        aria-label="Open DigiSeva chatbot"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    </div>
  );
}

function getStaticAnswer(prompt: string) {
  const lower = prompt.toLowerCase();

  if (lower.includes("pan")) {
    return "For PAN card help, DigiSeva Point can guide new PAN, correction, reprint, and status support. Keep Aadhaar, photo, signature, mobile number, and email ready.";
  }

  if (lower.includes("document") || lower.includes("docs")) {
    return "Common documents include Aadhaar, address proof, photo, signature, registered mobile/email, and application number. Document needs change by service.";
  }

  if (lower.includes("pay") || lower.includes("fee") || lower.includes("price")) {
    return "Fees are confirmed before work starts. On GitHub Pages, please confirm payment details by calling or WhatsApp 8269805682.";
  }

  if (lower.includes("book") || lower.includes("appointment") || lower.includes("call")) {
    return "Use the booking form or WhatsApp 8269805682. Video appointments are supported through Jitsi after confirmation.";
  }

  return "I can help with DigiSeva services, PAN card assistance, documents, appointments, payments, and video support. For direct support, WhatsApp 8269805682.";
}
