// First-party cookie consent — no third-party dependency.
// Stores the visitor's choice in a `pk-consent` cookie and broadcasts changes
// via window events so the script loader and banner stay in sync.

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

const COOKIE = "pk-consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days
export const CONSENT_VERSION = 1;

// Bump CONSENT_VERSION to re-prompt everyone after a policy change.
export const CONSENT_EVENT = "pk-consent-change"; // fired with detail: ConsentState
export const OPEN_EVENT = "pk-open-consent"; // ask the banner to reopen

export function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)pk-consent=([^;]+)/);
  if (!match) return null;
  try {
    const obj = JSON.parse(decodeURIComponent(match[1]));
    if (obj.v !== CONSENT_VERSION) return null; // outdated → re-prompt
    return { analytics: !!obj.a, marketing: !!obj.m };
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(
    JSON.stringify({ a: state.analytics ? 1 : 0, m: state.marketing ? 1 : 0, v: CONSENT_VERSION })
  );
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
}

// Called from anywhere (e.g. a footer link) to reopen the preferences panel.
export function openConsentSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_EVENT));
}
