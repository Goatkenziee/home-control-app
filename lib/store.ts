// Lightweight reactive store — similar to Zustand API, zero deps

type Listener = () => void;

export function createStore<T extends Record<string, unknown>>(initialState: T) {
  let state = { ...initialState };
  const listeners = new Set<Listener>();

  return {
    getState: () => state,
    setState: (partial: Partial<T> | ((prev: T) => Partial<T>)) => {
      const next = typeof partial === "function" ? (partial as (prev: T) => Partial<T>)(state) : partial;
      state = { ...state, ...next } as T;
      listeners.forEach((fn) => fn());
    },
    subscribe: (fn: Listener) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    reset: () => {
      state = { ...initialState };
      listeners.forEach((fn) => fn());
    },
  };
}

// React hook for consuming the store
import { useSyncExternalStore } from "react";

export function useStore<T extends Record<string, unknown>, U>(
  store: ReturnType<typeof createStore<T>>,
  selector: (state: T) => U,
): U {
  return useSyncExternalStore(
    (cb) => store.subscribe(cb),
    () => selector(store.getState()),
    () => selector(store.getState()),
  );
}
