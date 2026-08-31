import { defineConfig } from "@playwright/test";
export default defineConfig({ testDir: "./e2e", use: { baseURL: "http://127.0.0.1:3210" }, webServer: { command: "pnpm --filter web dev -- --port 3210", url: "http://127.0.0.1:3210", reuseExistingServer: !process.env.CI } });
