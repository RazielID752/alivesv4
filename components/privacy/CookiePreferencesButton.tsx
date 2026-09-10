"use client";

import { Cookie } from "lucide-react";
import { openCookiePreferences } from "@/components/privacy/CookieConsent";

export function CookiePreferencesButton() {
  return (
    <button
      className="inline-flex text-[12px] items-center gap-1.5 text-left font-bold tracking-[0.18em] hover:text-blue-600 cursor-pointer"
      onClick={openCookiePreferences}
      type="button"
    >
      Cookies
    </button>
  );
}
