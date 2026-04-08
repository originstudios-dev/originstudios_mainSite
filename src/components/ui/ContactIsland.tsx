"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/registry";
import { supabase } from "@/lib/supabase";

export function ContactIsland() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const islandRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;

    if (open) {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Stop Lenis/page scroll when drawer is open
  useEffect(() => {
    if (!open) return;

    // Prevent page scroll completely when drawer is open
    const preventDefault = (e: Event) => {
      const drawer = drawerRef.current;
      if (drawer && drawer.contains(e.target as Node)) return; // allow inside drawer
      e.preventDefault();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const requirement = data.get("requirement") as string;
    const details = data.get("build") as string;

    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({ name, email, requirement, details });

    if (insertError) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }

    // Call edge function directly for email notification
    fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/notify-contact`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, requirement, details }),
      }
    ).catch(() => {});

    setSubmitted(true);
    form.reset();
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 2500);
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[199] bg-[#11120D]/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      {open && (
        <div
          ref={drawerRef}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[201] w-[92vw] max-w-md rounded-2xl border border-[#D8CFBC]/15"
          style={{ background: "#11120D", top: "24px", display: "flex", flexDirection: "column" }}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-[#D8CFBC]/10 shrink-0">
            <h3 className="font-clash text-xl font-bold text-[#FFFBF4] uppercase tracking-tight">
              Let&apos;s Talk
            </h3>
            <div className="mt-3 flex flex-col gap-1.5">
              <a
                href="mailto:talk@originstudios.dev"
                className="font-satoshi text-sm text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors"
              >
                talk@originstudios.dev
              </a>
              <span className="font-satoshi text-xs text-[#D8CFBC]/50">
                Earth-616
              </span>
            </div>
          </div>

          {/* Scrollable form area */}
          <div
            className="overflow-y-auto overscroll-contain flex-1"
            style={{ WebkitOverflowScrolling: "touch" }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="ci-name"
                    className="font-satoshi text-xs text-[#D8CFBC]/60 uppercase tracking-widest"
                  >
                    Your name
                  </label>
                  <input
                    id="ci-name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="mt-1.5 w-full bg-transparent border-b border-[#D8CFBC]/20 focus:border-[#D8CFBC] outline-none py-2 font-satoshi text-sm text-[#FFFBF4] placeholder:text-[#565449] transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ci-email"
                    className="font-satoshi text-xs text-[#D8CFBC]/60 uppercase tracking-widest"
                  >
                    Email
                  </label>
                  <input
                    id="ci-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="mt-1.5 w-full bg-transparent border-b border-[#D8CFBC]/20 focus:border-[#D8CFBC] outline-none py-2 font-satoshi text-sm text-[#FFFBF4] placeholder:text-[#565449] transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ci-requirement"
                    className="font-satoshi text-xs text-[#D8CFBC]/60 uppercase tracking-widest"
                  >
                    What do you need?
                  </label>
                  <input
                    id="ci-requirement"
                    name="requirement"
                    type="text"
                    required
                    placeholder="Website, SaaS, Redesign..."
                    className="mt-1.5 w-full bg-transparent border-b border-[#D8CFBC]/20 focus:border-[#D8CFBC] outline-none py-2 font-satoshi text-sm text-[#FFFBF4] placeholder:text-[#565449] transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ci-build"
                    className="font-satoshi text-xs text-[#D8CFBC]/60 uppercase tracking-widest"
                  >
                    Tell us more
                  </label>
                  <textarea
                    id="ci-build"
                    name="build"
                    rows={3}
                    placeholder="Brief about your project, timeline, budget..."
                    className="mt-1.5 w-full bg-transparent border-b border-[#D8CFBC]/20 focus:border-[#D8CFBC] outline-none py-2 font-satoshi text-sm text-[#FFFBF4] placeholder:text-[#565449] transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="submit"
                    className="flex-1 font-satoshi text-sm font-medium bg-[#FFFBF4] text-[#11120D] py-3 rounded-lg hover:bg-[#D8CFBC] transition-colors"
                  >
                    Send Inquiry
                  </button>
                  <a
                    href="https://calendar.app.google/A4dhfx1ANCEbszet5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 font-satoshi text-sm font-medium border border-[#D8CFBC]/30 text-[#D8CFBC] py-3 rounded-lg hover:bg-[#D8CFBC]/10 transition-colors text-center"
                  >
                    Book a Call
                  </a>
                </div>
              </form>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="font-clash text-2xl font-bold text-[#FFFBF4]">
                  We&apos;ll be in touch.
                </p>
                <p className="font-satoshi text-sm text-[#D8CFBC] mt-2">
                  Your inquiry has been received. We&apos;ll get back to you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="px-6 pb-4">
                <p className="font-satoshi text-sm text-red-400 text-center">
                  Something went wrong. Please try again or email us directly.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Island Button */}
      <button
        ref={islandRef}
        onClick={toggle}
        data-cursor="expand"
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#D8CFBC]/30 backdrop-blur-md transition-all duration-300 hover:scale-105 group"
        style={{
          background: open
            ? "rgba(216, 207, 188, 0.95)"
            : "rgba(216, 207, 188, 0.92)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))",
        }}
        aria-label={open ? "Close contact form" : "Open contact form"}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#11120D] opacity-30" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#11120D]" />
        </span>
        <span className="font-satoshi text-sm font-medium text-[#11120D] tracking-wide">
          {open ? "Close" : "Contact Us"}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className="text-[#11120D] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path
            d="M2 4.5L6 8.5L10 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
    </>
  );
}
