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

export const API_URL = process.env.NEXT_PUBLIC_FITLOG_API_URL ?? "https://api.abcz.workers.dev/api/fitlog";
export const fallbackImage = "/assets/workout.png";
const imageCacheKey = "fitlog-workout-images";

export const fallbackWorkouts: Workout[] = [
  { id: "1", name: "BARBELL BENCH PRESS", description: "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.", categories: ["Chest", "Arms"], equipment: "Barbell, Bench", difficulty: "Intermediate", sets: "4", reps: "6-8", duration: 25, calories: 180, rating: 4.8, image: fallbackImage, instructions: ["Lie back with eyes under the bar and feet planted firmly.", "Grip the bar just outside shoulder width and unrack with control.", "Lower the bar to the middle of your chest while keeping wrists stacked.", "Drive the bar up until your arms are straight, then repeat." ] },
  { id: "2", name: "PULL-UP", description: "A bodyweight back builder that trains your lats, grip, and upper-back control.", categories: ["Back", "Arms"], equipment: "Pull-up Bar", difficulty: "Advanced", sets: "4", reps: "6-10", duration: 20, calories: 145, rating: 4.9, image: fallbackImage, instructions: ["Hang from the bar with hands slightly wider than your shoulders.", "Brace your core and pull your shoulder blades down.", "Drive your elbows toward your ribs until your chin clears the bar.", "Lower slowly to a full hang and repeat." ] },
  { id: "3", name: "BACK SQUAT", description: "A foundational lower-body lift for building strong, balanced legs.", categories: ["Legs", "Glutes"], equipment: "Barbell, Rack", difficulty: "Intermediate", sets: "4", reps: "6-8", duration: 30, calories: 240, rating: 4.9, image: fallbackImage, instructions: ["Set the bar across your upper back and stand with feet shoulder width.", "Brace your trunk and unlock your knees and hips together.", "Descend until your thighs are at least parallel with the floor.", "Push through your whole foot to stand tall." ] },
  { id: "4", name: "OVERHEAD PRESS", description: "A strict standing press for durable shoulders and a strong overhead position.", categories: ["Shoulders", "Arms"], equipment: "Barbell", difficulty: "Intermediate", sets: "4", reps: "6-8", duration: 22, calories: 155, rating: 4.7, image: fallbackImage, instructions: ["Hold the bar at upper-chest height with wrists stacked.", "Squeeze your glutes and brace before each rep.", "Press the bar overhead while moving your head back then through.", "Lock out overhead and lower with control." ] },
  { id: "5", name: "DUMBBELL BICEP CURL", description: "A focused arm movement that builds elbow flexion strength and control.", categories: ["Arms"], equipment: "Dumbbells", difficulty: "Beginner", sets: "3", reps: "10-12", duration: 15, calories: 95, rating: 4.6, image: fallbackImage, instructions: ["Stand tall with a dumbbell in each hand and palms facing forward.", "Keep your elbows tucked beside your ribs.", "Curl the weights without swinging your torso.", "Squeeze at the top and lower slowly." ] },
  { id: "6", name: "HOLLOW-BODY PLANK", description: "A core tension drill that teaches full-body control under fatigue.", categories: ["Core"], equipment: "Mat", difficulty: "Intermediate", sets: "3", reps: "30 sec", duration: 12, calories: 75, rating: 4.5, image: fallbackImage, instructions: ["Lie on your back and extend your arms overhead.", "Press your lower back into the floor and lift your shoulders.", "Extend your legs until you can keep your ribs tucked.", "Hold steady, breathe, and relax between rounds." ] },
  { id: "7", name: "BURPEE", description: "A high-output full-body drill that mixes a squat, plank, and jump for conditioning.", categories: ["Full Body"], equipment: "Bodyweight", difficulty: "Intermediate", sets: "4", reps: "8-12", duration: 12, calories: 160, rating: 4.2, image: fallbackImage, instructions: ["Squat down and plant your hands on the floor.", "Kick the feet back to a solid plank, then jump them forward.", "Explode up into a jump and land softly.", "Keep a steady rhythm and a braced midline."] },
  { id: "8", name: "CONVENTIONAL DEADLIFT", description: "Hip-hinge powerhouse for the posterior chain, grip, and total-body tension.", categories: ["Back", "Legs"], equipment: "Barbell", difficulty: "Advanced", sets: "4", reps: "3-5", duration: 28, calories: 260, rating: 4.9, image: fallbackImage, instructions: ["Stand with the bar over mid-foot and take a strong mixed or double-overhand grip.", "Set the back flat, brace hard, and push the floor away.", "Stand tall by driving hips to the bar, then reverse the path.", "Do not bounce the plates; reset tension every rep."] },
  { id: "9", name: "PUSH-UP", description: "A scalable pressing staple that trains chest, triceps, and a rigid trunk.", categories: ["Chest", "Arms", "Core"], equipment: "Bodyweight", difficulty: "Beginner", sets: "3", reps: "12-15", duration: 10, calories: 90, rating: 4.5, image: fallbackImage, instructions: ["Place hands slightly wider than shoulders, body in a straight line.", "Lower until the chest nearly kisses the floor.", "Press up without letting hips pike or sag.", "Keep elbows about 45 degrees from the torso."] },
  { id: "10", name: "WALKING LUNGE", description: "Unilateral stepping pattern that builds quads, glutes, and balance under load.", categories: ["Legs"], equipment: "Dumbbells (optional)", difficulty: "Beginner", sets: "3", reps: "10-12/leg", duration: 18, calories: 170, rating: 4.4, image: fallbackImage, instructions: ["Step forward and drop the back knee toward the floor.", "Keep the front knee stacked over the mid-foot.", "Drive through the front heel to the next step.", "Stay tall through the torso and control each landing."] },
  { id: "11", name: "RUSSIAN TWIST", description: "Rotational core work that trains the obliques while you stay balanced on the sit bones.", categories: ["Core"], equipment: "Medicine Ball", difficulty: "Beginner", sets: "3", reps: "16-20", duration: 8, calories: 70, rating: 4.1, image: fallbackImage, instructions: ["Sit with a slight lean back and feet lightly off the floor.", "Hold the ball at chest height and rotate to one side.", "Tap the floor, then rotate to the other side.", "Move from the ribcage, not just the arms."] },
  { id: "12", name: "KETTLEBELL SWING", description: "Explosive hip hinge that builds posterior power, grip, and conditioning in one move.", categories: ["Full Body", "Shoulders"], equipment: "Kettlebell", difficulty: "Intermediate", sets: "5", reps: "12-15", duration: 16, calories: 200, rating: 4.7, image: fallbackImage, instructions: ["Hinge, hike the bell back between the legs, then snap the hips.", "Let the bell float to chest height with loose arms.", "Brace at the top, then hinge as the bell falls.", "Never squat the swing - it is a hinge, not a squat."] },];

export function getLocalWorkoutImage(workout: Pick<Workout, "id" | "name">) {
  return `/assets/workouts/${workout.id}.jpg`;
}

fallbackWorkouts.forEach((workout) => { workout.image = getLocalWorkoutImage(workout); });

function value(source: Record<string, unknown>, keys: string[], fallback: unknown) {
  for (const key of keys) if (source[key] !== undefined && source[key] !== null && source[key] !== "") return source[key];
  return fallback;
}

function normalizeImage(input: unknown, fallback: string): string {
  if (typeof input === "string") {
    const image = input.trim();
    return image || fallback;
  }
  if (input && typeof input === "object") {
    const source = input as Record<string, unknown>;
    return normalizeImage(source.url ?? source.src ?? source.image ?? source.imageUrl ?? source.imageURL ?? source.image_url ?? source.gifUrl ?? source.gifURL ?? source.gif_url ?? source.images ?? source.media, fallback);
  }
  return fallback;
}

export function isFallbackImage(image: string) {
  return !image || image === fallbackImage || image === "/assets/banner.png";
}

export function getCachedWorkoutImages(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const value = JSON.parse(window.localStorage.getItem(imageCacheKey) ?? "{}");
    return value && typeof value === "object" ? value as Record<string, string> : {};
  } catch {
    return {};
  }
}

export function rememberWorkoutImages(workouts: Workout[]) {
  if (typeof window === "undefined") return;
  try {
    const images = getCachedWorkoutImages();
    workouts.forEach((workout) => {
      if (!isFallbackImage(workout.image)) images[workout.id] = workout.image;
    });
    window.localStorage.setItem(imageCacheKey, JSON.stringify(images));
    window.dispatchEvent(new Event("fitlog-images-updated"));
  } catch {}
}

export function applyCachedWorkoutImage(workout: Workout) {
  const image = getCachedWorkoutImages()[workout.id] ?? getLocalWorkoutImage(workout);
  return isFallbackImage(workout.image) ? { ...workout, image } : workout;
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
    calories: num(value(item, ["calories", "caloriesBurned", "calorie", "kcal"], fallback.calories), fallback.calories),
    rating: num(value(item, ["rating", "score"], fallback.rating), fallback.rating),
    image: normalizeImage(value(item, ["image", "imageUrl", "imageURL", "image_url", "gifUrl", "gifURL", "gif_url", "thumbnail", "photo", "images", "media"], fallback.image), fallback.image),
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
