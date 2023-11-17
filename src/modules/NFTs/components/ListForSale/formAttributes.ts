import { z } from 'zod';

const MINIMUM_PRICE = 1;

export const validationSchema = z.object({
  price: z.number().min(MINIMUM_PRICE, 'price_min'),
  paymentAmount: z.string(),
  tokenType: z.number(),
});

export type SubmitValues = z.infer<typeof validationSchema>;
