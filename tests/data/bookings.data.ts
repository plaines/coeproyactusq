import { Booking } from '../../api/models';

export const bookingCases: Array<{ name: string; booking: Booking }> = [
  {
    name: 'with deposit',
    booking: {
      firstname: 'Ana',
      lastname: 'Torres',
      totalprice: 250,
      depositpaid: true,
      bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' },
      additionalneeds: 'Breakfast',
    },
  },
  {
    name: 'without deposit',
    booking: {
      firstname: 'Luis',
      lastname: 'Mora',
      totalprice: 120,
      depositpaid: false,
      bookingdates: { checkin: '2026-12-10', checkout: '2026-12-12' },
      additionalneeds: 'Late checkout',
    },
  },
];