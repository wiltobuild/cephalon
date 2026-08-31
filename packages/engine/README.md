# Engine package

This package keeps the upstream source tree without its `lib/` prefix. Its
contained `@/*` alias resolves to `src/*`; the only mechanical import rewrite
is `@/lib/...` to `@/...` across copied TypeScript files. `apps/web` compiles
the package from source through `transpilePackages` until a build output is
needed by a second consumer or for publishing.
