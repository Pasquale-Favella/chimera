# Chimera Competitive Upgrade Plan

## Execution model: waves, tracks, and the standard QA loop

**Waves = sequential gates. Tracks within a wave = run in parallel.** Full graph tracked in SQL (`todos` + `todo_deps` + `track_waves`) in the working session; this file is the human-readable mirror.

| Wave | Tracks running in parallel | Gate to next wave |
|---|---|---|
| 1 | A-hygiene (bug fixes, sanitization, safe/misc deps), D-mcp (mutation tools), E-editing-ux (dnd-kit audit only) | All wave-1 items pass their QA loop |
| 2 | B-ai-core (ai SDK v7, zod v4, prisma v7 — parallel to each other), C-mastra (install + scaffold) | AI SDK + zod major bumps merged and green |
| 3 | B-ai-core sequential: ai-reliability → structured-ui-schema (this one is inherently linear, cannot parallelize — each step is a precondition for the next) | structured-ui-schema merged and passes full canvas regression |
| 4 | E-editing-ux (props panel), F-collab (real-time + branching versioning), C-mastra (patch-based refinement) — all three only need the schema, independent of each other | all green |
| 5 | deps-next-major (Next 15→16, done last since it touches everything) | — |

**Standard per-task QA loop (applied to every todo, not just described once):**
1. **Implement** — either do it directly, or delegate mechanical/boilerplate work to `opencode run "<prompt>"` so architecture-level work stays with the primary agent in the same wave.
2. **Control/revision pass** — launch a `code-review` (or `security-review` for the sanitization task, `rubber-duck` for the structured-schema and collab tasks given their size) sub-agent against the diff. This is a second independent model pass, not self-review.
3. **Test** — run the smallest targeted command that covers the change (typecheck/build/lint, or a scoped smoke test); for `structured-ui-schema` and `collab-versioning` this means a fuller regression pass since they're cross-cutting.
4. **Loop** — if review flags issues or tests fail, revise and repeat steps 2–3. Bounded to 3 iterations; if still failing, stop and escalate to the user rather than looping indefinitely.
5. Mark the todo `done`, unblocking dependents.

**Delegation policy:** `opencode run "<prompt>"` is used for simple, mechanical, low-ambiguity subtasks (dependency bumps, dead-code removal, boilerplate scaffolding) so they can run as background workers while architecturally sensitive tasks (structured schema, AI reliability, collab) are done directly, with sub-agents doing the review/test pass rather than the implementation.

## Git Flow model

`develop` (pushed to `origin/develop`) is the long-lived integration branch for this whole upgrade initiative. `main` is never pushed to or force-pushed — it stays exactly as it was before this initiative started until the user decides to promote a release.

- **Feature branch per todo**: `feature/<todo-id>` (e.g. `feature/fix-openrouter-bug`), always branched from `develop`, worked in its own `git worktree` to avoid ever mixing in unrelated working-directory state.
- **Per-task flow** (extends the standard QA loop with git steps):
  1. `git worktree add ../chimera-wt-<name> -b feature/<todo-id> develop`
  2. Implement (self or `opencode run`)
  3. Control/revision sub-agent pass on the diff
  4. Test
  5. Loop (revise → re-review → re-test) until green, bounded to 3 iterations
  6. `git merge --no-ff feature/<todo-id>` into `develop` (merge commit kept for traceability), delete the feature branch and worktree
- **Wave = parallel feature branches, all merged into `develop` before the wave is considered closed.**
- **Release per wave**: once a wave's branches are all merged to `develop` and green, cut `release/wave-N-<name>` from `develop`, run the wave-level regression pass, merge to `main` with a tag (`v0.1.0` … `v1.0.0`), then back-merge `main` into `develop` before cutting the next wave's feature branches.
- **Hotfix branches** (`hotfix/<name>` off `main`) only if something breaks in production between waves — merged back to both `main` and `develop`.

| Wave | Release branch | Tag |
|---|---|---|
| 1 | `release/wave-1-hygiene` | v0.1.0 |
| 2 | `release/wave-2-ai-core-deps` | v0.2.0 |
| 3 | `release/wave-3-structured-schema` | v0.3.0 |
| 4 | `release/wave-4-editing-collab` | v0.4.0 |
| 5 | `release/wave-5-next-major` | v1.0.0 |

## Checklist

Each task's sub-boxes are: Branch → Implement → Review → Test → Merged.

### Wave 1 — fully parallel, no dependencies ✅ ALL MERGED TO `develop`
- [x] **A-hygiene: Fix OpenRouterProvider apiKey bug** (`fix-openrouter-bug`)
  - [x] Investigated — confirmed **false positive** (tool-output redaction of the Bearer-token string made correct code look broken). No code change needed.
- [x] **A-hygiene: Remove dead code** (`remove-dead-code`)
  - [x] Branch, opencode-delegated implementation (removed dead `modifySingleDesign`, unused `designSystem` destructure)
  - [x] code-review pass
  - [x] typecheck green
  - [x] Merged to `develop` (`feature/remove-dead-code-v2`)
- [x] **A-hygiene: Add HTML sanitization** (`add-html-sanitization`)
  - [x] Branch, implemented `sanitizeGeneratedHtml()` (isomorphic-dompurify), wired into all 5 `ai.service.ts` HTML return points
  - [x] security-review pass — found and fixed a second gap: `design.router.ts`/`component.router.ts` accepted raw client HTML with zero sanitization at the persistence boundary; fixed
  - [x] tested with malicious payload sample (script/onerror/javascript:/iframe stripped, form preserved)
  - [x] Merged to `develop`
- [x] **A-hygiene: Upgrade safe minor/patch deps** (`deps-safe-minor`)
  - [x] Branch, opencode-delegated bump (Radix UI, tRPC, react-query, react/react-dom, xyflow, tailwindcss, better-auth, date-fns, jotai, superjson, tailwind-merge, react-hook-form, hookform-resolvers) — all bumps confirmed to stay within existing major versions
  - [x] code-review pass — no issues
  - [x] `npm install` + `tsc --noEmit` green
  - [x] Merged to `develop`
- [x] **A-hygiene: Upgrade misc major deps** (`deps-misc-major`)
  - [x] Branch, opencode-delegated bump (lucide-react 0→1, recharts 2→3, react-day-picker 9→10, uuid 13→14, react-resizable-panels 3→4) + fixed renamed APIs (chart.tsx, calendar.tsx, resizable.tsx)
  - [x] code-review pass — found and fixed a real regression: v4's `react-resizable-panels` dropped the `data-panel-group-direction` attribute the UI relied on for vertical-orientation styling; replaced with the correct `aria-orientation` selector
  - [x] `tsc --noEmit` green
  - [x] Merged to `develop`
- [x] **D-mcp: Add MCP mutation tools** (`mcp-mutation-tools`)
  - [x] Branch, implemented `chimera_generate_design` / `chimera_modify_design` / `chimera_create_flow` MCP tools + matching `McpService` methods, mirroring the tRPC `aiGenerate`/`aiModify`/`aiGenerateFlow` mutations with MCP-userId-based authorization (`assertMcpProjectAccess`) and sanitization
  - [x] code-review pass — found and fixed one divergence (`count` max should be 4, matching the tRPC schema, not 5)
  - [x] integration smoke test (authorization enforced before any AI call/DB write, verified against a real dev DB)
  - [x] Merged to `develop`
- [x] **E-editing-ux: Audit unused dnd-kit** (`dnd-kit-audit`)
  - [x] explore agent confirmed zero usage of `@dnd-kit/*` anywhere in `src/`
  - [x] Decision: remove (unused, no near-term plan requires it before Wave 4's props panel)
  - [x] `npm uninstall` the 4 packages, typecheck green
  - [x] Merged to `develop`

**Wave 1 release gate:**
- [ ] Cut `release/wave-1-hygiene` from `develop`
- [ ] Wave-level regression pass
- [ ] Merge to `main`, tag `v0.1.0`
- [ ] Back-merge `main` into `develop`

### Wave 2 — parallel, gated on Wave 1 completing
- [ ] **B-ai-core: Upgrade AI SDK to v7** (`deps-ai-sdk-major`)
  - [ ] Branch `feature/deps-ai-sdk-major` off `develop`
  - [ ] Bump `ai` 6→7 + `@ai-sdk/google` 3→4
  - [ ] code-review sub-agent breaking-change scan
  - [ ] full `ai.service.ts` test pass
  - [ ] Merged to `develop`
- [ ] **B-ai-core: Upgrade zod 3→4** (`deps-zod-major`)
  - [ ] Branch `feature/deps-zod-major` off `develop`
  - [ ] Bump zod, fix breakages
  - [ ] code-review sub-agent pass
  - [ ] zod schema unit checks pass
  - [ ] Merged to `develop`
- [ ] **B-ai-core: Upgrade Prisma 6→7** (`deps-prisma-major`)
  - [ ] Branch `feature/deps-prisma-major` off `develop`
  - [ ] Bump Prisma, review migration guide for SQLite
  - [ ] code-review sub-agent pass
  - [ ] `db:push` + query smoke test
  - [ ] Merged to `develop`
- [ ] **C-mastra: Install + scaffold Mastra workflows** (`mastra-integration`)
  - [ ] Branch `feature/mastra-integration` off `develop`
  - [ ] Install `mastra`, scaffold design-quality / memory / product-flow
  - [ ] code-review sub-agent pass
  - [ ] integration test each workflow independently
  - [ ] Merged to `develop`

**Wave 2 release gate:**
- [ ] Cut `release/wave-2-ai-core-deps` from `develop`
- [ ] Wave-level regression pass
- [ ] Merge to `main`, tag `v0.2.0`
- [ ] Back-merge `main` into `develop`

### Wave 3 — strictly sequential (cannot parallelize)
- [ ] **B-ai-core: AI reliability layer** (`ai-reliability`) — depends on AI SDK v7
  - [ ] Branch `feature/ai-reliability` off `develop`
  - [ ] Implement retry/backoff/timeout, rate limiting, `AiUsageLog`, `streamObject` conversion
  - [ ] code-review sub-agent pass
  - [ ] load + failure-injection test
  - [ ] Merged to `develop`
- [ ] **B-ai-core: Structured UI schema** (`structured-ui-schema`) — depends on zod v4 + ai-reliability
  - [ ] Branch `feature/structured-ui-schema` off `develop`
  - [ ] Implement recursive `UINode` Zod schema, `Design.schema` column, tree→HTML renderer, patch-based `aiModify`
  - [ ] Multi-agent review: code-review + rubber-duck
  - [ ] full canvas regression test
  - [ ] Merged to `develop`

**Wave 3 release gate:**
- [ ] Cut `release/wave-3-structured-schema` from `develop`
- [ ] Wave-level regression pass
- [ ] Merge to `main`, tag `v0.3.0`
- [ ] Back-merge `main` into `develop`

### Wave 4 — parallel, gated on structured-ui-schema
- [ ] **C-mastra: Patch-based auto-fix refinement** (`mastra-integration-refine`)
  - [ ] Branch, implement tree-node patch auto-fix, review, regression test, merge
- [ ] **E-editing-ux: Visual props panel** (`editing-ux-props-panel`)
  - [ ] Branch, implement props panel bound to UI schema, review, UI interaction test, merge
- [ ] **F-collab: Real-time collaboration + branching versioning** (`collab-versioning`)
  - [ ] Branch, implement presence/live cursors + version-node history, code-review + rubber-duck, multi-user concurrent-edit test, merge

**Wave 4 release gate:**
- [ ] Cut `release/wave-4-editing-collab` from `develop`
- [ ] Wave-level regression pass
- [ ] Merge to `main`, tag `v0.4.0`
- [ ] Back-merge `main` into `develop`

### Wave 5 — final, after everything else is stable
- [ ] **A-hygiene: Upgrade Next.js 15→16** (`deps-next-major`)
  - [ ] Branch, bump Next major, code-review, full e2e smoke test (canvas, auth, tRPC, MCP routes), merge

**Wave 5 release gate (final):**
- [ ] Cut `release/wave-5-next-major` from `develop`
- [ ] Full regression pass
- [ ] Merge to `main`, tag `v1.0.0`
- [ ] Back-merge `main` into `develop`

## Verdict: evolve, don't rewrite
Core architecture is sound and worth keeping: iframe `srcDoc` + `sandbox="allow-scripts"` sandboxing, React Flow canvas, tRPC + Prisma + Better Auth, provider-agnostic LlmManager, MCP server exposing designs to external agents. No reason to throw this away — problems are additive gaps and a few real bugs, not systemic flaws.

## Sequencing rationale
Bugs/deps (Wave 1, done) → AI-core majors + Mastra scaffold (Wave 2) → AI reliability + structured schema (Wave 3, unlocks everything else) → Mastra refinement + editing UX + collab (Wave 4) → Next.js major (Wave 5, last).
