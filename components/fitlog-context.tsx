"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Workout } from "@/lib/workouts";

type FitLogContextValue = {
  ready: boolean;
  plan: Workout[];
  saved: Workout[];
  done: string[];
  addToPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;
  removeFromPlan: (id: string) => void;
  removeSaved: (id: string) => void;
  markDone: (id: string) => void;
};

const FitLogContext = createContext<FitLogContextValue | null>(null);

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = window.localStorage.getItem("fitlog-plan");
      const storedSaved = window.localStorage.getItem("fitlog-saved");
      const storedDone = window.localStorage.getItem("fitlog-done");
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      if (storedDone) setDone(JSON.parse(storedDone));
    } catch { /* localStorage can be unavailable in private browsing */ }
    setReady(true);
  }, []);

  useEffect(() => { if (ready) window.localStorage.setItem("fitlog-plan", JSON.stringify(plan)); }, [plan, ready]);
  useEffect(() => { if (ready) window.localStorage.setItem("fitlog-saved", JSON.stringify(saved)); }, [saved, ready]);
  useEffect(() => { if (ready) window.localStorage.setItem("fitlog-done", JSON.stringify(done)); }, [done, ready]);

  const value = useMemo<FitLogContextValue>(() => ({
    ready,
    plan,
    saved,
    done,
    addToPlan: (workout) => {
      if (plan.length >= 5 || plan.some((item) => item.id === workout.id)) return false;
      setPlan((current) => [...current, workout]);
      return true;
    },
    saveForLater: (workout) => {
      if (saved.some((item) => item.id === workout.id)) return false;
      setSaved((current) => [...current, workout]);
      return true;
    },
    removeFromPlan: (id) => setPlan((current) => current.filter((item) => item.id !== id)),
    removeSaved: (id) => setSaved((current) => current.filter((item) => item.id !== id)),
    markDone: (id) => setDone((current) => current.includes(id) ? current : [...current, id]),
  }), [plan, saved, done, ready]);

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const value = useContext(FitLogContext);
  if (!value) throw new Error("useFitLog must be used inside FitLogProvider");
  return value;
}
