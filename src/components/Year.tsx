"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

// Read on the client so the static shell never bakes in a stale year.
export function Year() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => 2026);
  return <>{year}</>;
}
