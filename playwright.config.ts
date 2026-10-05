import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { env } from './configs/env';

// Lee los .feature, los une con los steps y devuelve la carpeta con los tests generados
const bddTestDir = defineBddConfig({
  features: 'features/*.feature',
  steps: ['steps/*.ts', 'tests/fixtures/*.ts'],
});

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
    { name: 'unit',     testDir: './tests/unit' },
    { name: 'bdd',      testDir: bddTestDir,   use: { ...devices['Desktop Chrome'] } },
    { name: 'api', testDir: './tests/api', use: {baseURL: env.apiBaseUrl,extraHTTPHeaders: { Accept: 'application/json' },   // esta API es estricta con Accept
  },},
  ],
});