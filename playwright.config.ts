import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    timeout: 15_000,
    use: {
        baseURL: 'http://localhost:5199',
    },
    webServer: {
        command: 'npx vite --config tests/fixtures/vite.config.ts --port 5199',
        port: 5199,
        reuseExistingServer: !process.env.CI,
    },
});
