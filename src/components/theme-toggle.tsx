"use client";

import { useCallback, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";

type Theme = "light" | "dark";

/*
  Runs before paint so the page never flashes the wrong theme. Light is the
  default: a stored choice wins, otherwise light regardless of the OS setting.

  The storage key carries a version. When the default flipped from dark to
  light, anyone who had visited already held a stored value from the old era,
  and a stored value beats the default by design. Changing the key makes the
  old value invisible, so everyone lands on the new default once and any
  toggle they make from here on is respected again.
*/
const STORAGE_KEY = "zulaiz-theme-v2";
export const themeScript = `(function(){try{var s=localStorage.getItem("zulaiz-theme-v2");document.documentElement.dataset.theme=(s==="dark")?"dark":"light";}catch(e){document.documentElement.dataset.theme="light";}})();`;

const EVENT = "zulaiz:themechange";

/* The document element is the source of truth, so read it rather than
   mirroring it into React state. */
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, getSnapshot, () => "light");

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked in private mode. The toggle still works for this page.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {theme === "dark" ? (
        <SunIcon weight="bold" className="size-4" />
      ) : (
        <MoonIcon weight="bold" className="size-4" />
      )}
    </button>
  );
}
