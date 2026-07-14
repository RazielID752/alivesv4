"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { Cookie, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "marcos-n-cookie-consent";
const OPEN_PREFERENCES_EVENT = "cookie-consent:open";

type ConsentChoice = "accepted" | "rejected" | null;

type CookieConsentProps = Readonly<{
  gtmId: string;
}>;

function saveConsent(choice: Exclude<ConsentChoice, null>) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // The in-memory choice still applies when storage is unavailable.
  }
}

export function CookieConsent({ gtmId }: CookieConsentProps) {
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let storedChoice: string | null = null;

    try {
      storedChoice = window.localStorage.getItem(CONSENT_KEY);
    } catch {
      // Some privacy modes disable storage; show the banner normally.
    }

    if (storedChoice === "accepted" || storedChoice === "rejected") {
      setChoice(storedChoice);
    }

    const openPreferences = () => setIsOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    setIsReady(true);

    return () => {
      window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    };
  }, []);

  const updateChoice = (nextChoice: Exclude<ConsentChoice, null>) => {
    saveConsent(nextChoice);
    setChoice(nextChoice);
    setIsOpen(false);
  };

  const shouldShowBanner = isReady && (choice === null || isOpen);

  return (
    <>
      {choice === "accepted" && process.env.NODE_ENV === "production" ? (
        <GoogleTagManager gtmId={gtmId} />
      ) : null}

      {shouldShowBanner ? (
        <div
          aria-label="Preferências de cookies"
          aria-live="polite"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-5xl rounded-[1.75rem] border border-white/12 bg-zinc-950/95 p-5 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-6"
          role="dialog"
        >
          <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-zinc-950">
              <Cookie aria-hidden="true" className="h-5 w-5" />
            </span>

            <div>
              <h2 className="text-base font-semibold tracking-[-0.02em]">
                Sua privacidade importa
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-300">
                Usamos cookies essenciais e, com sua permissão, cookies
                analíticos para entender o uso do site e melhorar a experiência.
                Consulte a{" "}
                <Link
                  className="font-semibold text-white underline decoration-white/35 underline-offset-4 transition hover:decoration-white"
                  href="/politica-de-privacidade"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
              <button
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => updateChoice("rejected")}
                type="button"
              >
                <X aria-hidden="true" className="h-4 w-4" />
                Recusar opcionais
              </button>
              <button
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950"
                onClick={() => updateChoice("accepted")}
                type="button"
              >
                <ShieldCheck aria-hidden="true" className="h-4 w-4" />
                Aceitar cookies
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
