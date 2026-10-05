import { test, expect } from '../fixtures/test';
import {
  BookingSchema,
  CreatedBookingSchema,
  TokenSchema,
  BadCredentialsSchema,
} from '../../api/models';
import { parseJson } from '../../utils/parseJson';
import { bookingCases } from '../data/bookings.data';
import { env } from '../../configs/env';

test.describe('Booking API', () => {
  // Parametrizado: un test por cada elemento de bookings.data.ts
  for (const { name, booking } of bookingCases) {
    test(`POST creates a booking: ${name}`, async ({ bookingApi }) => {
      const res = await bookingApi.create(booking);           // objeto -> JSON (serializar)

      expect(res).toBeOK();
      const body = await parseJson(res, CreatedBookingSchema); // JSON -> objeto (deserializar)
      expect(body.bookingid).toBeGreaterThan(0);
      expect(body.booking).toEqual(booking);                   // la API guardó lo que enviamos
    });
  }

  test('GET returns the booking we just created', async ({ bookingApi }) => {
    const { booking } = bookingCases[0];
    // Creamos nuestros propios datos: el sandbox es compartido y se reinicia
    const created = await parseJson(await bookingApi.create(booking), CreatedBookingSchema);

    const res = await bookingApi.getById(created.bookingid);

    expect(res).toBeOK();
    expect(await res.json()).toMatchSchema(BookingSchema);
    expect(await parseJson(res, BookingSchema)).toEqual(booking);
  });

  test('GET a non-existent booking returns 404', async ({ bookingApi }) => {
    const res = await bookingApi.getById(99999999);

    expect(res.status()).toBe(404);
    expect(await res.text()).toContain('Not Found');
  });

  test('DELETE without credentials is rejected (403)', async ({ bookingApi }) => {
    const { booking } = bookingCases[0];
    const created = await parseJson(await bookingApi.create(booking), CreatedBookingSchema);

    const res = await bookingApi.delete(created.bookingid);   // sin token

    expect(res.status()).toBe(403);
    expect(await res.text()).toContain('Forbidden');
  });
});

test.describe('Auth API', () => {
  test('POST /auth with valid credentials returns a token', async ({ authApi }) => {
    const res = await authApi.createToken({
      username: env.api.username,
      password: env.api.password,
    });

    expect(res).toBeOK();
    await parseJson(res, TokenSchema);
  });

  // Rareza de la API: credenciales malas -> 200 con { reason }, no un 401
  test('POST /auth with bad credentials returns a reason', async ({ authApi }) => {
    const res = await authApi.createToken({ username: 'nobody', password: 'wrong' });

    expect(res.status()).toBe(200);
    const body = await parseJson(res, BadCredentialsSchema);
    expect(body.reason).toBe('Bad credentials');
  });
});