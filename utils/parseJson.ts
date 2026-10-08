import { APIResponse } from '@playwright/test';
import { ZodType } from 'zod';
import { ApiParseError } from './errors';

export async function parseJson<T>(res: APIResponse, schema: ZodType<T>): Promise<T> {
    try {
        return schema.parse(await res.json());
    } catch (error) {
        throw new ApiParseError(
            `Unexpected body from ${res.url()} (status ${res.status()})\n${String(error)}`,
        );
    }
}