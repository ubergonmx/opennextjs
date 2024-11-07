I started with `npm create cloudflare@latest -- . --framework=next --experimental` and installed the packages `npm @t3-oss/env-nextjs zod`.

I added `target: "ES2017"` to tsconfig.json
I created env.ts in src/:
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

I created .dev.vars with `DEMO=hello` and added `DEMO: string;` in env.d.ts
I then imported `env` used it in app/page.tsx, ran `npm run preview` and everything went well.

I then deployed to Workers connected to Git:
Build command: npx cloudflare
Deploy command: npx wrangler deploy

Add `DEMO` secret to **Variables and Secrets** in the Settings and pushed a commit to re-deploy (CI/CD).





