# FitLog

FitLog is a dark, focused workout library for choosing lifts, building a five-exercise plan, and tracking the work you finish. The interface follows the supplied Penpot/Figma direction: charcoal surfaces, lime accents, compact stat rows, and a bold display type treatment.

## Features

- Responsive workout library with API loading state and a safe local fallback dataset.
- Detail pages with equipment, difficulty, sets, reps, duration, calories, rating, and four-step instructions.
- Add to today’s plan and save for later actions with toast feedback.
- My Plan metrics for exercises, minutes, and calories, plus Today’s Plan and Saved tabs.
- Mark-as-done and remove actions with live counters in the navbar.
- Duration, calories, and rating sorting, plus name/tag search.
- LocalStorage persistence and a five-lift plan cap.
- Custom 404 page and reload-safe App Router routes.

## Technologies

Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, CSS variables, Lucide React icons, and the FitLog API.

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

The app normalizes common API field names and falls back to the twelve design-aligned workouts if the API is unavailable. This keeps local development and deployment usable during an API outage.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a production build with:

```bash
npm run build
npm start
```

## Project structure

- `app/` — App Router pages, layout, global styling, and 404 handling.
- `components/` — shared header, footer, cards, toast, and plan state provider.
- `lib/workouts.ts` — API normalization and fallback workout data.
- `assets/` — supplied FitLog logo and hero illustration.
- `UI/` — supplied Penpot/Figma design references.

## Submission

- Live Link: https://assignment-6-kappa-lake.vercel.app/
- GitHub Repository Link: `https://github.com/MahYaFarah/Assignment---6`
