"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, BookmarkPlus, Check, Clock3, Flame, Plus, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { API_URL, applyCachedWorkoutImage, fallbackWorkouts, findFallbackWorkout, getLocalWorkoutImage, isFallbackImage, normalizeResponse, rememberWorkoutImages, type Workout } from "@/lib/workouts";
import { useFitLog } from "@/components/fitlog-context";
import { Toast } from "@/components/toast";

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const id = String(params?.id ?? "");
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const { plan, saved, addToPlan, saveForLater } = useFitLog();

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_URL}/${encodeURIComponent(id)}`, { signal: controller.signal, cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Not found")))
      .then(async (payload) => {
        const results = normalizeResponse(payload);
        const selected = results.find((item) => item.id === id) ?? fallbackWorkouts.find((item) => item.id === id) ?? findFallbackWorkout(id);
        let resolved = applyCachedWorkoutImage(selected);
        if (isFallbackImage(resolved.image)) {
          try {
            const libraryResponse = await fetch(API_URL, { signal: controller.signal, cache: "no-store" });
            if (libraryResponse.ok) {
              const libraryWorkout = normalizeResponse(await libraryResponse.json()).find((item) => item.id === id);
              if (libraryWorkout && !isFallbackImage(libraryWorkout.image)) {
                resolved = { ...resolved, image: libraryWorkout.image };
                rememberWorkoutImages([libraryWorkout]);
              }
            }
          } catch {}
        }
        if (!isFallbackImage(resolved.image)) rememberWorkoutImages([resolved]);
        setWorkout(resolved);
      })
      .catch(() => setWorkout(applyCachedWorkoutImage(fallbackWorkouts.find((item) => item.id === id) ?? findFallbackWorkout(id))))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [id]);

  if (loading) return <div className="loading-grid container"><div><div className="spinner" /><p>Loading workout…</p></div></div>;
  if (!workout) return <div className="not-found"><div><h1>404</h1><p>That workout could not be found.</p><Link className="button button-primary" href="/">Back to library</Link></div></div>;
  const inPlan = plan.some((item) => String(item.id) === String(workout.id));
  const inSaved = saved.some((item) => item.id === workout.id);

  return <div className="detail-page container"><Link className="back-link" href="/" style={{ display: "inline-flex", gap: 7, alignItems: "center", color: "#98a1ad", fontSize: 11, marginBottom: 21 }}><ArrowLeft size={14} /> BACK TO LIBRARY</Link><div className="detail-layout">
    <div className="detail-visual"><img src={workout.image} alt={workout.name} onError={(event) => { event.currentTarget.src = getLocalWorkoutImage(workout); }} /></div>
    <article className="detail-info"><p className="eyebrow">WORKOUT / {workout.id.padStart(2, "0")}</p><h1>{workout.name}</h1><p className="detail-description">{workout.description}</p><div className="tags">{workout.categories.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <div className="spec-panel"><Spec label="Equipment" value={workout.equipment} /><Spec label="Difficulty" value={workout.difficulty} /><Spec label="Sets" value={workout.sets} /><Spec label="Reps" value={workout.reps} /><Spec label="Duration" value={`${workout.duration} min`} /><Spec label="Calories" value={`${workout.calories} kcal`} /><Spec label="Rating" value={<span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Star size={13} color="#ccff00" />{workout.rating.toFixed(1)}</span>} /></div>
      <div className="instructions"><h3>INSTRUCTIONS</h3><ol>{workout.instructions.slice(0, 4).map((step) => <li key={step}>{step}</li>)}</ol></div>
      <div className="detail-actions"><button className="button button-primary" disabled={inPlan} onClick={() => { const added = addToPlan(workout); setMessage(added ? "Added to today’s plan" : plan.length >= 5 ? "Today’s plan is capped at five lifts" : "Already in today’s plan"); }}><Plus size={15} />{inPlan ? "IN TODAY'S PLAN" : "ADD TO TODAY'S PLAN"}</button><button className="button button-secondary" onClick={() => { const added = saveForLater(workout); setMessage(added ? "Saved for later" : "Already saved"); }}><BookmarkPlus size={15} />{inSaved ? "SAVED" : "SAVE FOR LATER"}</button></div>
    </article>
  </div><Toast message={message} onClose={() => setMessage(null)} /></div>;
}

function Spec({ label, value }: { label: string; value: React.ReactNode }) { return <div className="spec-row"><span>{label}</span><span>{value}</span></div>; }
