"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, Clock3, Flame, Search, Star, X } from "lucide-react";
import { useFitLog } from "@/components/fitlog-context";
import { Toast } from "@/components/toast";

export default function MyPlanPage() {
  const { ready, plan, saved, done, removeFromPlan, removeSaved, markDone } = useFitLog();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => { if (new URLSearchParams(window.location.search).get("tab") === "saved") setTab("saved"); }, []);
  const items = tab === "plan" ? plan : saved;
  const filtered = useMemo(() => items.filter((item) => [item.name, ...item.categories].join(" ").toLowerCase().includes(query.toLowerCase())), [items, query]);
  const minutes = plan.reduce((sum, item) => sum + item.duration, 0);
  const calories = plan.reduce((sum, item) => sum + item.calories, 0);

  return <div className="plan-page container"><div className="page-intro"><p className="section-kicker">02 / YOUR SESSION</p><h1>MY PLAN</h1><p>Cap of five lifts for today. Finish them, then load more.</p></div>
    <div className="metrics"><div className="metric"><label>Exercises</label><strong>{plan.length}</strong></div><div className="metric"><label>Minutes</label><strong>{minutes}</strong></div><div className="metric"><label>Calories</label><strong>{calories}</strong></div></div>
    <div className="tabs"><button className={tab === "plan" ? "active" : ""} onClick={() => setTab("plan")}>Today&apos;s Plan <span>({plan.length})</span></button><button className={tab === "saved" ? "active" : ""} onClick={() => setTab("saved")}>Saved <span>({saved.length})</span></button><label className="search-box" style={{ marginLeft: "auto", marginBottom: 5, height: 35 }}><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search plan" /></label></div>
    {!ready ? <div className="loading-grid"><div><div className="spinner" /><p>Loading workouts…</p></div></div> : filtered.length ? <div className="plan-list">{filtered.map((workout) => <div className="plan-card" key={workout.id}><div className="plan-thumb"><img src={workout.image} alt="" /></div><div><h3>{workout.name}</h3><p className="equipment">{workout.equipment}</p><div className="stats"><span className="stat"><Clock3 size={13} />{workout.duration} min</span><span className="stat"><Flame size={13} />{workout.calories} kcal</span><span className="stat"><Star size={13} />{workout.rating.toFixed(1)}</span></div></div><div className="plan-actions"><Link className="button button-secondary" href={`/workout/${workout.id}`}>VIEW DETAILS</Link>{tab === "plan" && <button className="button button-primary" onClick={() => { markDone(workout.id); setMessage(`${workout.name} marked as done`); }}><Check size={14} />{done.includes(workout.id) ? "DONE" : "MARK AS DONE"}</button>}<button className="icon-button" aria-label={`Remove ${workout.name}`} onClick={() => { tab === "plan" ? removeFromPlan(workout.id) : removeSaved(workout.id); setMessage(tab === "plan" ? "Removed from today’s plan" : "Removed from saved"); }}><X size={16} /></button></div></div>)}</div> : <div className="empty-state"><h2>NOTHING HERE YET</h2><p>Browse the library and add a lift to get today moving.</p><Link className="button button-primary" href="/">GO TO WORKOUTS</Link></div>}
    <Toast message={message} onClose={() => setMessage(null)} />
  </div>;
}
