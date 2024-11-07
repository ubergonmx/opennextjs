import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DEMO: z.string().trim().min(1),
  },
  client: {},
  runtimeEnv: {
    DEMO: process.env.DEMO,
  },
  emptyStringAsUndefined: true,
});
