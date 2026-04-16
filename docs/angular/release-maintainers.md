# Release Maintainers Guide

## Current maturity

The library is currently in **alpha (pre-1.0)** stage.

- Stable API guarantees start at `1.0.0`.
- Until then, versioning follows `0.y.z`.
- Consumers should treat minor upgrades as potentially impactful.

## Version policy

- `0.y.0`: major feature waves and potentially breaking changes.
- `0.y.z`: bug fixes and non-breaking improvements.
- Tags follow the Nx pattern `liquid-glass-ui@x.y.z`.

## Commit and PR rules

- Use Conventional Commits (`feat:`, `fix:`, `perf:`, `refactor:`, `docs:`, `chore:`).
- Use `!` or `BREAKING CHANGE:` when introducing breaking behavior.
- PRs are validated by:
  - semantic PR title check
  - library test/build in CI
  - lint is currently tracked as technical debt and should be addressed incrementally

## Release automation

Release runs in `.github/workflows/release.yml` on `main` (or manually).

The workflow performs:

1. `npm run release:version` (`nx release version`)
2. `npm run release:changelog` (`nx release changelog`)
3. Pushes commit + tags to `main`
4. `npm run release:publish -- --tag=next` (`nx release publish`)
5. Creates a GitHub Release from the latest tag

### Dist-tags strategy

- `next`: default channel while alpha is evolving quickly.
- `latest`: use only after promoting a stable line (or at `1.0.0`).

To publish stable manually:

```bash
npm run release:publish -- --tag=latest
```

## Branch protection (recommended)

Apply these settings on `main`:

- Require pull request before merging
- Require status checks to pass:
  - `Conventional commits`
  - `Lint, test and build`
- Require branches to be up to date before merge
- Restrict direct pushes to admins/bots only

## Compatibility policy

The package should keep explicit `peerDependencies` aligned to supported Angular majors.

For every Angular major upgrade:

1. Update peers (`@angular/*`, `rxjs`)
2. Verify demos and tests
3. Document compatibility matrix in release notes
