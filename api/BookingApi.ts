import { APIRequestContext, APIResponse } from '@playwright/test';
import { Booking } from './models';
import { API_PATHS } from '../configs/constants';

export class BookingApi {
    constructor(private readonly request: APIRequestContext) { }

    // POST con JSON: la data se serializa 
    create(booking: Booking): Promise<APIResponse> {
        return this.request.post(API_PATHS.booking, { data: booking });
    }

    getById(id: number): Promise<APIResponse> {
        return this.request.get(`${API_PATHS.booking}/${id}`);
    }

    // Sin token no se envia credencial
    delete(id: number, token?: string): Promise<APIResponse> {
        return this.request.delete(
            `${API_PATHS.booking}/${id}`,
            token ? { headers: { Cookie: `token=${token}` } } : undefined,
        );
    }
}