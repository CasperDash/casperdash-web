import { z } from 'zod';

export const validationSchema = z
  .object({
    asset: z.string(),
    transferAmount: z.number().max(1000000000),
    receivingAddress: z.string().nonempty('receiving_address_required'),
    transferId: z.number(),
    maxAssetAmount: z.number().optional(),
    tokenAddress: z.string().optional(),
    isToken: z.boolean().optional(),
  })
  .refine((data) => data.transferAmount >= 2.5, {
    message: 'min_transfer_amount_required',
    path: ['transferAmount'],
  })
  .refine((data) => data.transferAmount <= (data.maxAssetAmount || 0), {
    message: 'transfer_amount_is_not_enought',
    path: ['transferAmount'],
  });

export type FieldValues = z.infer<typeof validationSchema>;
