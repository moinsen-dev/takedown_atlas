# Repository Guidelines

## Project Structure & Module Organization

- `prd.md` captures the current product scope; update it when asset changes support new narratives or KPIs.
- `takedown-atlas-brand-starter-kit/` is the working directory for all brand deliverables:
  - `logo/` holds SVG lockups and exported rasters; maintain both primary and reversed variants.
  - `tokens/` stores design tokens (`color-tokens.json`, `css-variables.css`, `tailwind.preset.cjs`); keep values consistent across files and document rationale in commits.
  - `social/` contains share images; provide SVG source plus PNG fallbacks when introducing new ratios.
  - `usage/brand-guidelines.md` captures voice, spacing, and legal guardrails—revise alongside visual changes.
  - `license/` houses terms; ensure new artwork references the existing Apache-2.0 (code) or CC BY 4.0 (visuals) notice as appropriate.

## Build, Test, and Development Commands

- `npx svgo logo/takedown-atlas-logo-primary.svg` optimizes and validates updated SVG assets; run for every modified file in `logo/` or `social/`.
- `npx prettier tokens/color-tokens.json --check` enforces token formatting; install Prettier locally if it is not already available.
- `npx tailwindcss -c takedown-atlas-brand-starter-kit/tokens/tailwind.preset.cjs -i takedown-atlas-brand-starter-kit/tokens/css-variables.css -o /tmp/takedown-atlas.css --minify` confirms the preset loads without syntax errors.
- `jq . takedown-atlas-brand-starter-kit/tokens/color-tokens.json` quickly validates JSON structure when editing without Prettier.

## Coding Style & Naming Conventions

- Use two-space indentation and Unix line endings for CSS, JSON, and JS/TS snippets; avoid trailing whitespace.
- Prefix assets with `takedown-atlas-` plus hyphenated descriptors (e.g., `takedown-atlas-logo-reversed.svg`).
- Expose colors only through `--brand-*` CSS variables and matching `brand.*` / `state.*` Tailwind keys; update both CSS and preset together.
- Mirror voice guidance in copy changes: neutral, evidence-based, and non-accusatory as outlined in `usage/brand-guidelines.md`.

## Testing Guidelines

- Preview new visuals on light (`#F6F8FA`) and dark (`#0F172A`) backdrops before merging; attach before/after renders to the pull request.
- Run `npx svgo --pretty <file.svg>` to inspect path counts and strip metadata; reject exports that introduce styler-specific namespaces.
- Validate the Tailwind preset with `node -e "require('./takedown-atlas-brand-starter-kit/tokens/tailwind.preset.cjs')"` to catch syntax regressions.
- For textual edits, proofread against `usage/brand-guidelines.md` and confirm legal language still matches the license folder.

## Commit & Pull Request Guidelines

- Write imperative, scope-led commit subjects such as `tokens: sync accent palette` so downstream consumers can cherry-pick.
- Commit logical units separately (tokens vs. assets) and include inline notes about why values changed, not just what changed.
- Mention licensing considerations whenever adding third-party elements or derivatives.
- Pull requests should provide: summary, affected paths, command results (or manual checks performed), and visual previews when assets change.
