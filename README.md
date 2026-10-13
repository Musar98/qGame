# qGame — The Fiddy Question Game

A responsive, accessible trivia quiz built with [Angular 20](https://angular.dev).
Answer 50 multiple-choice questions from the [Open Trivia Database](https://opentdb.com),
beat the clock, then review every answer.

## Prerequisites

- Node.js 20+ and npm

## Development server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically on source changes.

## Build

```bash
npm run build
```

Production artifacts are emitted to `dist/`.

## Testing

Unit tests live in `tests/` (mirroring `src/`), with shared factories in
`tests/helpers/`. They run via [Karma](https://karma-runner.github.io) + Jasmine:

```bash
npm test                        # watch mode
npm run test:headless           # single run, headless Chrome
npm run test:coverage           # single run with coverage report
npm run typecheck               # type-check app + tests without emitting
```

Chrome/Chromium is required. If it is not on your `PATH`, point Karma at it:

```bash
CHROME_BIN=/path/to/chrome npm run test:headless
```

## Formatting

```bash
npm run format                  # rewrite with Prettier
npm run format:check            # verify formatting
```

## Project layout

```text
src/app/
  app.component.*            Start screen (username + category picker)
  categories.constants.ts    Alphabetically sorted fallback categories
  app.config.ts              App providers (HttpClient)
  gamescreen/
    game-screen.component.*  Quiz flow, timer, results review
    game-screen.utils.ts     Question loading / shuffling / HTML decoding
    demo-questions.constants.ts  Offline fallback question set
    types.ts                 Question model
    spinner/                 Loading indicator
  pageheader/ pagefooter/    Shell chrome
  services/
    open-trivia-api.service.ts  Open Trivia Database client (HttpClient)
    types.ts                   API response models
tests/
  unit/**                    Unit specs mirroring src/
  helpers/                   Shared test factories
```

## Notes

- The trivia API sometimes returns HTML entities (`&quot;`, `&#039;`, …); they are
  decoded before display.
- If the API is unreachable, the game falls back to the bundled demo questions
  so it stays playable offline.
