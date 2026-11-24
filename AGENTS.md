<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Typografia / kopia

- NIGDY nie używaj długiej pauzy (em dash, „—", U+2014): ani w treści widocznej dla użytkownika (PL/EN), ani w komentarzach kodu. Zamiast niej stosuj półpauzę („–", U+2013) w polskim tekście jako myślnik zdaniowy, zwykły dywiz („-") w kodzie/komentarzach, albo przeredaguj zdanie (przecinek, dwukropek).
- Półpauza („–") jest OK w zakresach liczbowych (np. „0,1–0,5 mm") i jako myślnik w polskich zdaniach.

## Comments

- Default to no comment. Code, names, and types should carry the meaning. A wrong or stale comment is worse than none.
- Only comment the non-obvious *why*: a constraint, a gotcha, a decision the code cannot express itself. Never restate what the code already says; if it needs a "what" comment, improve the naming instead.
- The best comments state a constraint: what breaks if this changes.
- No ticket numbers, changelog notes, or "moved/added/changed in X" history. That lives in git, not the source.
- Never narrate structure ("getters for X", "the auth block") or the change you just made. Code has no memory of its past.
- These rules override matching the surrounding file's comment style. A heavily commented file is a file to leave better than you found it.
