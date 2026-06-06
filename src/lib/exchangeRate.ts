import { useSyncExternalStore } from "react";

const STORAGE_KEY = "usd_rub_rate_v1";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const FALLBACK_RATE = 95;

type Cached = { rate: number; ts: number };

let currentRate: number = FALLBACK_RATE;
let fetched = false;
const listeners = new Set<() => void>();

function readCache(): Cached | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cached;
    if (typeof parsed.rate !== "number" || typeof parsed.ts !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(rate: number) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ rate, ts: Date.now() } satisfies Cached));
  } catch {
    // ignore
  }
}

function setRate(rate: number) {
  if (rate > 0 && rate !== currentRate) {
    currentRate = rate;
    listeners.forEach((l) => l());
  }
}

async function fetchRate() {
  try {
    const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    if (!res.ok) return;
    const data = await res.json();
    const rate = data?.Valute?.USD?.Value;
    if (typeof rate === "number" && rate > 0) {
      setRate(rate);
      writeCache(rate);
    }
  } catch {
    // ignore network errors, keep fallback/cache
  }
}

function ensureInitialized() {
  if (fetched) return;
  fetched = true;
  const cached = readCache();
  if (cached) {
    currentRate = cached.rate;
    if (Date.now() - cached.ts > TTL_MS) {
      void fetchRate();
    }
  } else {
    void fetchRate();
  }
}

export function getUsdRubRate(): number {
  ensureInitialized();
  return currentRate;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useUsdRubRate(): number {
  ensureInitialized();
  return useSyncExternalStore(
    subscribe,
    () => currentRate,
    () => FALLBACK_RATE,
  );
}

/**
 * Конвертирует доллары в рубли по текущему курсу с округлением вверх до 1000 ₽.
 * Возвращает строку вида "39 000 ₽".
 */
export function formatRub(usd: number, rate?: number): string {
  const r = rate ?? getUsdRubRate();
  const rub = Math.ceil((usd * r) / 1000) * 1000;
  // Тонкий неразрывный пробел между разрядами и перед знаком ₽
  const formatted = rub.toLocaleString("ru-RU").replace(/\s/g, "\u202F");
  return `${formatted}\u202F₽`;
}

/**
 * Formats USD without conversion. Returns "$500" style with thin nbsp.
 */
export function formatUsd(usd: number): string {
  const formatted = Math.round(usd).toLocaleString("en-US");
  return `$${formatted}`;
}

/**
 * Returns price formatted in the active language's currency:
 * USD for English, RUB (converted) for Russian.
 */
export function formatPrice(usd: number, lang: "ru" | "en", rate?: number): string {
  return lang === "en" ? formatUsd(usd) : formatRub(usd, rate);
}