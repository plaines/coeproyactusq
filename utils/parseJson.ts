import { APIResponse } from '@playwright/test';
import { ZodType } from 'zod';
import { ApiParseError } from './errors';

// Deserializa el cuerpo y lo valida contra un esquema. Devuelve un objeto ya tipado.
export async function parseJson<T>(res: APIResponse, schema: ZodType<T>): Promise<T> {
  try {
    return schema.parse(await res.json());
  } catch (error) {
    // Traducimos a un mensaje claro y relanzamos: el test sigue fallando
    throw new ApiParseError(
      `Unexpected body from ${res.url()} (status ${res.status()})\n${String(error)}`,
    );
  }
}