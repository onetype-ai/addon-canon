# Canon — TODO

## references (new sub-addon, `back/addons/references/`)

Canon verifies a file in isolation. It does not verify the **links between files** — who calls whom, which artifact must track which. Every bug below was found by hand on 2026-07-23; all three are statically decidable.

### Why

- Three elements renamed with an `admin-` infix (`global-heading`, `form-input`, `form-textarea`) kept their **old hash** in `.css`. Rules stopped applying, headings stopped breaking into lines **site-wide**, silently.
- `ui/onetype.json` carried `bundle: ["onetype/styles"]` pointing at a package that does not exist.
- Website CSS referenced ~20 `--ot-` tokens nobody defined anywhere (`--ot-slow`, `--ot-ease`, `--ot-ink`, `--ot-line`, `--ot-display-*`…), plus classes `.ot-art`, `.ot-frame`, `.ot-section-s`.

Unit tests would pass on all three. This is referential integrity, not behaviour.

### Rules

**A. `references.element.hash` — error**
Hash in `<element>.css` must equal the hash derived from `id` in `<element>.js` in the same folder. Note: old hashes are 7 chars, current are 8 — match `e-[0-9a-f]{7,8}`.

**B. `references.manifest.slug` — error**
Every `depends` / `bundle` slug in `onetype.json` must resolve to a real package or addon.

**C. `references.css.variables` — error**
Every `var(--x)` must have a definition within the scope's bundle.

**D. `references.css.classes` — error**
Every `.ot-` class used in markup must exist in CSS.

**E. `references.css.orphans` — warning, not error**
Defined but never referenced. Useless without these two built-in exemptions:
- token that appears anywhere in `setProperty('--x'` → set at runtime, skip
- class that is the stem of a dynamic concatenation (`' ot-art ' + color`) → `.ot-art.*` is live

Without the exemptions this rule fires on `--ot-navbar`, `--ot-page`, `--ot-package`, `.ot-art.blue` and gets switched off on day one.

### Scope

Run **per scope**, not over the whole repo. `--ot-navbar` is legitimate in `website` and an orphan in `admin`. Requires canon to read `onetype.json` `bundle` / `runtimes` and assemble the same file set `assets.Fn('get.css')` serves. Repo-wide runs produce false positives on C and D.

### Expected first run

C + D report the ~20 tokens and 4–5 classes above. E should flag `--ot-violet`, `--ot-ink-*`, `--ot-display-3` in `ui/front/css/variables.css` — added there by guesswork while hunting the bug, while `website/front/css/variables.css` is the real source. Those are duplicates to remove.

## Also open

- Dynamic string callsites are invisible to renames. `overlays.Fn('flip')` survived the verb rename to `do.flip` because it lives in a string. Same shape of bug as the hash mismatch.
- CSS is outside canon's JS scope entirely — element CSS files are tab-indented and canon reports bogus `parse` / indent violations on them. Rules A and C–E need canon to treat `.css` as a first-class input, not a JS file.
