import dotenv from 'dotenv';
import path from 'path';

export const TEST_ENV = process.env.TEST_ENV ?? 'qa';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${TEST_ENV}`) });

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable ${name} para TEST_ENV="${TEST_ENV}"`);
  }
  return value;
}

export const env = {
  name: TEST_ENV,
  uiBaseUrl: required('UI_BASE_URL'),
  apiBaseUrl: required('API_BASE_URL'),
  actionTimeout: Number(required('UI_TIMEOUT')),
  ui: {
    username: required('UI_USERNAME'),
    password: required('UI_PASSWORD'),
  },
  api: {
    username: required('API_USERNAME'),
    password: required('API_PASSWORD'),
  },
} as const;