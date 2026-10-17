# dalo.dev — portfolio v2

Terminal-styled, bilingual (EN/ES) static portfolio built with [Astro](https://astro.build).

## Commands

| Command         | Action                                                  |
| :-------------- | :------------------------------------------------------ |
| `pnpm dev`      | Dev server at `localhost:4321`                          |
| `pnpm build`    | Production build to `./dist/` (also validates content)  |
| `pnpm preview`  | Serve the build locally                                 |
| `pnpm check`    | Type-check (`astro check`)                              |
| `pnpm lint`     | ESLint (incl. jsx-a11y rules)                           |
| `pnpm format`   | Prettier                                                |
| `pnpm test:e2e` | Playwright smoke + axe accessibility tests (both langs) |

## Editing content

All content lives in `src/content/` and is validated by the schemas in `src/content.config.ts`.
Localized entries exist once per language with the **same file name**; the build fails if a
translation is missing.

| What       | Where                                                          |
| :--------- | :------------------------------------------------------------- |
| Experience | `src/content/experience/{en,es}/<slug>.yaml`                   |
| Education  | `src/content/education/{en,es}/<slug>.yaml`                    |
| Projects   | `src/content/projects/{en,es}/<slug>.md` → `/projects/<slug>/` |
| Skills     | `src/content/skills.yaml` (labels in `src/i18n/ui.ts`)         |
| UI strings | `src/i18n/ui.ts`                                               |
| Links / CV | `src/data/site.ts`, PDFs in `public/cv/`                       |

Dates use `YYYY-MM`; `end: null` marks a current role. Markdown below a project's front matter
is shown as a write-up on its detail page.

## Design

Colors, type and spacing are tokens in `src/styles/tokens.css`. Components only use the
semantic `--color-*` roles.
