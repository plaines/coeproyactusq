import { defineConfig, devices } from '@playwright/test';
import { env } from './configs/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: env.uiBaseUrl,
    actionTimeout: env.actionTimeout,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', testDir: './tests/ui', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  testDir: './tests/ui', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   testDir: './tests/ui', use: { ...devices['Desktop Safari'] } },
    { name: 'unit',     testDir: './tests/unit' },   // tests de lógica pura, sin navegador
  ],
});