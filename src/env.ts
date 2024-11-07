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
