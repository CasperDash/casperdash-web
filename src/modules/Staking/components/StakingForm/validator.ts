import Big from 'big.js';
import { RefinementCtx, z } from 'zod';

import { IValidator } from '@/hooks/queries/useGetValidators';
import i18n from '@/i18n';

const validate = (
  {
    delegateAmount,
    validator,
    balance,
  }: {
    delegateAmount: number;
    validator?: IValidator;
    balance?: number;
  },
  ctx: RefinementCtx
): void => {
  if (!validator) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['amount'],
      message: i18n.t('please_select_a_validator') as string,
    });
  }
  if (validator.isFullDelegator) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['validator'],
      message: i18n.t('you_are_already_a_full_delegator') as string,
    });
  }

  if (!validator.isStaked && delegateAmount < 500) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['amount'],
      message: i18n.t('please_enter_a_valid_amount', {
        val: 500,
      }) as string,
    });
  }

  if (!delegateAmount || delegateAmount < 2.5) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['amount'],
      message: i18n.t('please_enter_a_valid_amount', {
        val: 2.5,
      }) as string,
    });
  }

  if (delegateAmount > (balance || 0) + 2.5) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['amount'],
      message: i18n.t('insufficient_balance') as string,
    });
  }
};

export const validationSchema = z
  .object({
    amount: z
      .number()
      .transform((val) => Big(val).toNumber())
      .refine((val) => val >= 0, i18n.t('amount_required') as string)
      .default(0),
    validator: z.object({
      validatorPublicKey: z.string(),
      isFullDelegator: z.boolean(),
      isStaked: z.boolean(),
    }),
    balance: z.number().default(0),
  })
  .superRefine((val, ctx) => {
    return validate(
      {
        delegateAmount: val.amount,
        validator: val.validator as IValidator,
        balance: val.balance,
      },
      ctx
    );
  });

export type FieldValues = z.infer<typeof validationSchema> & {
  validator: IValidator;
};
