import mongoose from 'mongoose';
import { MAX_LOAN_AMOUNT, MAX_TENURE_MONTHS, MIN_LOAN_AMOUNT, MIN_TENURE_MONTHS } from 'shared';
const { Schema } = mongoose;

const LoanApplicationSchema = new Schema({
  loanAmount: { type: Number, min: MIN_LOAN_AMOUNT, max: MAX_LOAN_AMOUNT },
  tenureMonths: { type: Number, min: MIN_TENURE_MONTHS, max: MAX_TENURE_MONTHS },
  monthyRepayment: Number,
  email: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  phoneNumber: { type: String, minLength: 10, maxLength: 11, match: /^\d+$/ },
  jobIndustry: String,
  nationality: String,
}, { collection: 'loan_application' });

export const LoanApplicationModel = mongoose.model("LoanApplication", LoanApplicationSchema);
