import { z } from "zod"
import { jobIndustryOptions, nationalityOptions } from "./options.js"

export const MIN_LOAN_AMOUNT = 1000
export const MAX_LOAN_AMOUNT = 200000
export const MIN_TENURE_MONTHS = 3
export const MAX_TENURE_MONTHS = 72

export const loanApplicationSchema = z.object({
    loanAmount: z.number().min(MIN_LOAN_AMOUNT).max(MAX_LOAN_AMOUNT),
    tenureMonths: z.number().min(MIN_TENURE_MONTHS).max(MAX_TENURE_MONTHS),
    monthyRepayment: z.number(),
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dateOfBirth: z.coerce.date(),
    phoneNumber: z.string().min(10).max(11).regex(/^\d+$/, "Numeric values only."),
    jobIndustry: z.string().refine((value) => jobIndustryOptions.find(option => option.value === value), "Not a valid job industry."),
    nationality: z.string().refine((value) => nationalityOptions.find(option => option.value === value), "Not a valid nationality."),
})
