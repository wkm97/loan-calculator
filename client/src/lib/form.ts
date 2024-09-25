import { z } from "zod"

export const MIN_LOAN_AMOUNT = 1000
export const MAX_LOAN_AMOUNT = 200000
export const DEFAULT_LOAN_AMOUNT = 20000
export const MIN_TENURE_MONTHS = 3
export const MAX_TENURE_MONTHS = 72
export const MONTHLY_INTEREST_RATE = 0.005575
export const DEFAULT_TENURE_MONTHS = 48
export const STEP = 1000

export const formSchema = z.object({
  loanAmount: z.number().min(1000).max(200000),
  tenureMonths: z.number().min(3).max(72),
  monthyRepayment: z.number()
})
