# Contributing

Thanks for considering a contribution to DroidScreen.

## Ground Rules

- **Open an issue first** for non-trivial changes. Saves both of us time.
- **One PR = one concern.** Don't bundle a refactor with a feature.
- **macOS-only.** Windows/Linux support has been intentionally removed. PRs adding cross-platform code will be declined unless they don't compromise the macOS UX.
- **No telemetry.** No analytics. No "phone home." Ever.

## Setup

```bash
git clone https://github.com/8-BitBirdman/droidscreen
cd droidscreen
npm install
npm run dev
```

## Workflow

```bash
# Branch from master
git checkout -b feat/my-feature

# Make your changes
# ... edit files ...

# Lint before committing
npm run lint

# Commit (Conventional Commits style preferred)
git commit -m "feat: add device alias autocomplete"

# Push and open a PR
git push -u origin feat/my-feature
```

## Commit Message Style

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|:-------|:--------|
| `feat:` | New user-facing feature |
| `fix:` | Bug fix |
| `refactor:` | Code change that doesn't add features or fix bugs |
| `docs:` | Documentation only |
| `style:` | Formatting, missing semicolons, etc. |
| `chore:` | Build process, dependencies, tooling |
| `perf:` | Performance improvement |

Subject ≤ 50 chars. Body explains *why*, not *what*.

## Code Style

- **Tabs for indentation** (existing codebase convention)
- **Single quotes** for strings
- **No semicolons** in `.js` (matches eslint config), but `.vue` `<script>` blocks may use them
- **Prefer const** over let, never var
- **Arrow functions** for callbacks; named functions for top-level

When in doubt, run `npm run lint:fix`.

## Testing

There's no automated test harness yet. Contributions adding one (Jest, Vitest, or Playwright for E2E) are very welcome.

For now, manually verify:

1. App launches without console errors
2. USB-connected device appears in the list
3. Quick Connect scan completes (even if no devices found)
4. Configuration changes persist across restart
5. `npm run build` produces a working `.app` bundle

## Pull Request Checklist

- [ ] Code compiles (`npm run dev` works)
- [ ] Lint passes (`npm run lint`)
- [ ] Production build works (`npm run build`)
- [ ] Tested on at least one Android device
- [ ] Documentation updated (if user-facing change)
- [ ] No new dependencies unless absolutely necessary
- [ ] Commit messages follow Conventional Commits

## Architecture Decisions

If you're considering a significant change, read [architecture.md](./architecture.md) first. Summary:

- **Main process** owns all shell calls and the adbkit tracker
- **Renderer** never executes shell commands directly
- **All IPC inputs are validated** in main before reaching shell
- **i18n** stays English-only (this fork dropped multi-locale)

## Filing Bugs

Include:

1. macOS version
2. Phone make/model + Android version
3. DroidScreen version (Tray → About)
4. `scrcpy --version` and `adb --version`
5. Steps to reproduce
6. Console output (DevTools → Console, or main process logs from `~/Library/Logs/DroidScreen/` if available)

## Code of Conduct

Be decent. Assume good intent. Keep it about the code.
