import { APIRequestContext, APIResponse } from '@playwright/test';
import { Credentials } from './models';
import { API_PATHS } from '../configs/constants';

export class AuthApi {
    constructor(private readonly request: APIRequestContext) { }

    createToken(credentials: Credentials): Promise<APIResponse> {
        return this.request.post(API_PATHS.auth, { data: credentials });
    }
}