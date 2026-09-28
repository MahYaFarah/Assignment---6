"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { API_URL, fallbackWorkouts, normalizeResponse, rememberWorkoutImages, type Workout } from "@/lib/workouts";
import { WorkoutCard } from "@/components/workout-card";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("duration");

  useEffect(() => {
    const controller = new AbortController();
    fetch(API_URL, { signal: controller.signal, cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("API error")))
      .then((payload) => {
        const nextWorkouts = normalizeResponse(payload);
        rememberWorkoutImages(nextWorkouts);
        setWorkouts(nextWorkouts);
      })
      .catch(() => {
        rememberWorkoutImages(fallbackWorkouts);
        setWorkouts(fallbackWorkouts);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const visibleWorkouts = useMemo(() => {
    const searched = workouts.filter((workout) => [workout.name, ...workout.categories].join(" ").toLowerCase().includes(query.toLowerCase()));
    return [...searched].sort((a, b) => Number(b[sort as "duration" | "calories" | "rating"]) - Number(a[sort as "duration" | "calories" | "rating"]));
  }, [workouts, query, sort]);

  return <>
    <section className="hero container">
      <div className="hero-copy"><p className="eyebrow">WORKOUT LIBRARY</p><h1 className="display">TRAIN WITH INTENT. LOG EVERY SET.</h1><p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p><a className="button button-primary" href="#library">BROWSE WORKOUTS <ArrowRight size={15} /></a></div>
      <div className="hero-art"><img src="/assets/banner.png" alt="Athlete training on a gym machine" /></div>
    </section>
    <section className="library container" id="library">
      <div className="section-head"><div><p className="section-kicker">01 / WORKOUTS</p><h2>THE LIBRARY</h2><p>Twelve lifts covering every major muscle group.</p></div><div className="library-tools"><label className="search-box"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search workouts" aria-label="Search workouts" /></label><label className="sort-label"><SlidersHorizontal size={14} /> Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select></label></div></div>
      {loading ? <div className="loading-grid"><div><div className="spinner" /><p>Loading workouts…</p></div></div> : visibleWorkouts.length ? <div className="workout-grid">{visibleWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}</div> : <div className="empty-state"><h2>NO MATCHES</h2><p>Try a different exercise name or muscle group.</p></div>}
    </section>
  </>;
}
