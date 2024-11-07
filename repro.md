Steps to reproduce:
- Started with `npm create cloudflare@latest -- . --framework=next --experimental` and installed `@t3-oss/env-nextjs` and `zod`.
- Added `target: "ES2017"` to `tsconfig.json`.
- Created `env.ts` in `src/`:

    ```typescript
    import { getCloudflareContext } from "@opennextjs/cloudflare";
    import { createEnv } from "@t3-oss/env-nextjs";
    import { z } from "zod";

    const { env: cfEnv } = await getCloudflareContext();

    export const env = createEnv({
      server: {
        DEMO: z.string().trim().min(1),
      },
      client: {},
      runtimeEnv: {
        DEMO: cfEnv.DEMO,
      },
      emptyStringAsUndefined: true,
    });
    ```

- Set up `.dev.vars` with `DEMO=hello` and added `DEMO: string;` in `env.d.ts`.
- Imported `env` in `app/page.tsx` and ran `npm run preview`—everything worked fine locally.
- Deployed to Workers connected to Git, with:
  - **Build command:** `npx cloudflare`
  - **Deploy command:** `npx wrangler deploy`
- Added the `DEMO` secret in **Variables and Secrets** (runtime) in the Settings, and re-deployed (CI/CD).

UPDATE (Fix to the issue):
- Add the `DEMO` secret to **Variables and secrets** under the Build section instead