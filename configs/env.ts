import dotenv from 'dotenv';
import path from 'path';

// Si no defines TEST_ENV, usamos "qa"
export const TEST_ENV = process.env.TEST_ENV ?? 'qa';

// Carga el archivo .env.qa o .env.staging según TEST_ENV
dotenv.config({ path: path.resolve(process.cwd(), `.env.${TEST_ENV}`) });

// Si falta una variable, falla enseguida con un mensaje claro
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
  actionTimeout: Number(required('UI_TIMEOUT')),
  ui: {
    username: required('UI_USERNAME'),
    password: required('UI_PASSWORD'),
  },
} as const;