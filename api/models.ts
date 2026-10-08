import { z } from 'zod';

const DateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const BookingSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    totalprice: z.number(),
    depositpaid: z.boolean(),
    bookingdates: z.object({ checkin: DateString, checkout: DateString }),
    additionalneeds: z.string().optional(),
});
export type Booking = z.infer<typeof BookingSchema>;

// Respuesta del POST /booking: el id nuevo y la reserva guardada
export const CreatedBookingSchema = z.object({
    bookingid: z.number(),
    booking: BookingSchema,
});

export const TokenSchema = z.object({ token: z.string().min(5) });
export const BadCredentialsSchema = z.object({ reason: z.string() });

export type Credentials = { username: string; password: string };