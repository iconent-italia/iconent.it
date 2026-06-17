import { defineConfig } from '@playwright/test';
const PORT = 3100;
export default defineConfig({
  testDir: './e2e',
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: `http://localhost:${PORT}/concept/tony-effe/`,
    reuseExistingServer: false,
    timeout: 120000,
  },
  use: { baseURL: `http://localhost:${PORT}` },
});
