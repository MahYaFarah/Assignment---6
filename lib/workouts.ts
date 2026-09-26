export type Workout = {
  id: string;
  name: string;
  description: string;
  categories: string[];
  equipment: string;
  difficulty: string;
  sets: string;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
  instructions: string[];
};

export const API_URL = "https://api.abcz.workers.dev/api/fitlog";
const fallbackImage = "/assets/banner.png";

export const fallbackWorkouts: Workout[] = [
  { id: "1", name: "BARBELL BENCH PRESS", description: "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.", categories: ["Chest", "Arms"], equipment: "Barbell, Bench", difficulty: "Intermediate", sets: "4", reps: "6-8", duration: 25, calories: 180, rating: 4.8, image: fallbackImage, instructions: ["Lie back with eyes under the bar and feet planted firmly.", "Grip the bar just outside shoulder width and unrack with control.", "Lower the bar to the middle of your chest while keeping wrists stacked.", "Drive the bar up until your arms are straight, then repeat." ] },
  { id: "2", name: "PULL-UP", description: "A bodyweight back builder that trains your lats, grip, and upper-back control.", categories: ["Back", "Arms"], equipment: "Pull-up Bar", difficulty: "Advanced", sets: "4", reps: "6-10", duration: 20, calories: 145, rating: 4.9, image: fallbackImage, instructions: ["Hang from the bar with hands slightly wider than your shoulders.", "Brace your core and pull your shoulder blades down.", "Drive your elbows toward your ribs until your chin clears the bar.", "Lower slowly to a full hang and repeat." ] },
  { id: "3", name: "BACK SQUAT", description: "A foundational lower-body lift for building strong, balanced legs.", categories: ["Legs", "Glutes"], equipment: "Barbell, Rack", difficulty: "Intermediate", sets: "4", reps: "6-8", duration: 30, calories: 240, rating: 4.9, image: fallbackImage, instructions: ["Set the bar across your upper back and stand with feet shoulder width.", "Brace your trunk and unlock your knees and hips together.", "Descend until your thighs are at least parallel with the floor.", "Push through your whole foot to stand tall." ] },
  { id: "4", name: "OVERHEAD PRESS", description: "A strict standing press for durable shoulders and a strong overhead position.", categories: ["Shoulders", "Arms"], equipment: "Barbell", difficulty: "Intermediate", sets: "4", reps: "6-8", duration: 22, calories: 155, rating: 4.7, image: fallbackImage, instructions: ["Hold the bar at upper-chest height with wrists stacked.", "Squeeze your glutes and brace before each rep.", "Press the bar overhead while moving your head back then through.", "Lock out overhead and lower with control." ] },
  { id: "5", name: "DUMBBELL BICEP CURL", description: "A focused arm movement that builds elbow flexion strength and control.", categories: ["Arms"], equipment: "Dumbbells", difficulty: "Beginner", sets: "3", reps: "10-12", duration: 15, calories: 95, rating: 4.6, image: fallbackImage, instructions: ["Stand tall with a dumbbell in each hand and palms facing forward.", "Keep your elbows tucked beside your ribs.", "Curl the weights without swinging your torso.", "Squeeze at the top and lower slowly." ] },
  { id: "6", name: "HOLLOW-BODY PLANK", description: "A core tension drill that teaches full-body control under fatigue.", categories: ["Core"], equipment: "Mat", difficulty: "Intermediate", sets: "3", reps: "30 sec", duration: 12, calories: 75, rating: 4.5, image: fallbackImage, instructions: ["Lie on your back and extend your arms overhead.", "Press your lower back into the floor and lift your shoulders.", "Extend your legs until you can keep your ribs tucked.", "Hold steady, breathe, and relax between rounds." ] },
  { id: "7", name: "CONVENTIONAL DEADLIFT", description: "A full-body pull that develops posterior-chain strength from the floor.", categories: ["Back", "Legs"], equipment: "Barbell", difficulty: "Advanced", sets: "3", reps: "5", duration: 28, calories: 260, rating: 4.9, image: fallbackImage, instructions: ["Stand with the bar over your mid-foot and grip just outside your legs.", "Set your back flat and pull your shoulders slightly over the bar.", "Push the floor away while keeping the bar close to your shins.", "Stand tall, then hinge and lower the bar to the floor." ] },
  { id: "8", name: "PUSH-UP", description: "A classic pressing pattern for chest, shoulders, triceps, and trunk stability.", categories: ["Chest", "Arms"], equipment: "Bodyweight", difficulty: "Beginner", sets: "3", reps: "10-15", duration: 15, calories: 110, rating: 4.7, image: fallbackImage, instructions: ["Start in a high plank with hands under your shoulders.", "Brace your abs and keep a straight line from head to heels.", "Lower your chest while your elbows track at about 45 degrees.", "Press the floor away to return to the top." ] },
  { id: "9", name: "WALKING LUNGE", description: "A moving single-leg exercise for balanced strength and athletic hips.", categories: ["Legs", "Glutes"], equipment: "Dumbbells", difficulty: "Intermediate", sets: "3", reps: "12 / leg", duration: 18, calories: 170, rating: 4.7, image: fallbackImage, instructions: ["Stand tall with weights at your sides and ribs stacked.", "Step forward and lower until both knees bend to 90 degrees.", "Drive through the front foot to bring the back leg forward.", "Alternate sides for each controlled step." ] },
  { id: "10", name: "RUSSIAN TWIST", description: "A rotational core drill that builds control through the obliques.", categories: ["Core"], equipment: "Medicine Ball", difficulty: "Beginner", sets: "3", reps: "16 total", duration: 14, calories: 105, rating: 4.6, image: fallbackImage, instructions: ["Sit with knees bent and chest lifted.", "Hold the ball close and lean back until your core is engaged.", "Rotate your ribs to tap the ball beside one hip.", "Return through center and alternate sides." ] },
  { id: "11", name: "INCLINE DUMBBELL PRESS", description: "An upper-chest press with a longer range and steady shoulder position.", categories: ["Chest", "Shoulders"], equipment: "Dumbbells, Bench", difficulty: "Intermediate", sets: "3", reps: "8-10", duration: 24, calories: 165, rating: 4.8, image: fallbackImage, instructions: ["Set a bench to a low incline and plant your feet.", "Start with dumbbells above your chest and palms forward.", "Lower until elbows are just below the bench line.", "Press up and bring the weights together without clanking." ] },
  { id: "12", name: "CABLE ROW", description: "A supported horizontal pull for mid-back strength and posture.", categories: ["Back"], equipment: "Cable Machine", difficulty: "Beginner", sets: "3", reps: "10-12", duration: 20, calories: 130, rating: 4.7, image: fallbackImage, instructions: ["Sit tall with knees softly bent and hands on the handle.", "Brace your trunk and set your shoulders away from your ears.", "Pull the handle toward your lower ribs.", "Extend your arms slowly without rounding your back." ] },
];

function value(source: Record<string, unknown>, keys: string[], fallback: unknown) {
  for (const key of keys) if (source[key] !== undefined && source[key] !== null) return source[key];
  return fallback;
}

export function normalizeWorkout(raw: unknown, index = 0): Workout {
  const item = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const categories = value(item, ["categories", "category", "muscleGroups", "muscle_groups", "tags"], ["Full Body"]);
  const instructions = value(item, ["instructions", "steps", "instruction"], fallbackWorkouts[index % fallbackWorkouts.length].instructions);
  const fallback = fallbackWorkouts[index % fallbackWorkouts.length];
  const num = (input: unknown, fallbackNumber: number) => {
    const parsed = Number(String(input ?? "").replace(/[^0-9.]/g, ""));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallbackNumber;
  };
  return {
    id: String(value(item, ["id", "_id", "slug"], index + 1)),
    name: String(value(item, ["name", "title", "workoutName"], fallback.name)).toUpperCase(),
    description: String(value(item, ["description", "summary", "shortDescription"], fallback.description)),
    categories: Array.isArray(categories) ? categories.map(String) : String(categories).split(",").map((x) => x.trim()).filter(Boolean),
    equipment: String(value(item, ["equipment", "equipments", "gear"], fallback.equipment)),
    difficulty: String(value(item, ["difficulty", "level"], fallback.difficulty)),
    sets: String(value(item, ["sets", "set"], fallback.sets)),
    reps: String(value(item, ["reps", "repetitions", "rep"], fallback.reps)),
    duration: num(value(item, ["duration", "durationMinutes", "minutes"], fallback.duration), fallback.duration),
    calories: num(value(item, ["calories", "calorie", "kcal"], fallback.calories), fallback.calories),
    rating: num(value(item, ["rating", "score"], fallback.rating), fallback.rating),
    image: String(value(item, ["image", "imageUrl", "image_url", "thumbnail", "photo"], fallback.image)),
    instructions: Array.isArray(instructions) ? instructions.map(String) : fallback.instructions,
  };
}

export function normalizeResponse(payload: unknown): Workout[] {
  const list = Array.isArray(payload) ? payload : ((payload as { data?: unknown; workouts?: unknown; results?: unknown })?.data ?? (payload as { workouts?: unknown })?.workouts ?? (payload as { results?: unknown })?.results);
  if (list && !Array.isArray(list) && typeof list === "object") return [normalizeWorkout(list)];
  if (!Array.isArray(list) || list.length === 0) return fallbackWorkouts;
  return list.map((item, index) => normalizeWorkout(item, index));
}

export function findFallbackWorkout(id: string) {
  return fallbackWorkouts.find((workout) => workout.id === id) ?? fallbackWorkouts[0];
}
