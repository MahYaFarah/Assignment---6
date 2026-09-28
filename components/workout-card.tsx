import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import { getLocalWorkoutImage, type Workout } from "@/lib/workouts";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return <Link className="workout-card" href={`/workout/${workout.id}`}>
    <div className="card-image"><img src={workout.image} alt={workout.name} onError={(event) => { event.currentTarget.src = getLocalWorkoutImage(workout); }} /></div>
    <div className="card-content">
      <div className="tags">{workout.categories.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <h3>{workout.name}</h3>
      <p className="equipment">{workout.equipment}</p>
      <div className="stats"><span className="stat"><Clock3 size={13} />{workout.duration} min</span><span className="stat"><Flame size={13} />{workout.calories} kcal</span><span className="stat"><Star size={13} />{workout.rating.toFixed(1)}</span></div>
    </div>
  </Link>;
}
