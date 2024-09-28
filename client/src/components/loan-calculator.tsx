import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { DEFAULT_LOAN_AMOUNT, DEFAULT_TENURE_MONTHS, MAX_LOAN_AMOUNT, MAX_TENURE_MONTHS, MIN_LOAN_AMOUNT, MIN_TENURE_MONTHS, MONTHLY_INTEREST_RATE } from "@/lib/form"

interface LoanCalculatorProps {
  loanAmount: number
  tenureMonths: number
  onLoanAmountChange: (value: number) => void
  onTenureMonthsChange: (value: number) => void
  onMonthlyRepaymentChange?: (value: number) => void
}

const calculateMonthlyRepayment = (loanAmount: number, tenureMonths: number) => {
  const numerator = MONTHLY_INTEREST_RATE * Math.pow(1 + MONTHLY_INTEREST_RATE, tenureMonths);
  const denominator = Math.pow(1 + MONTHLY_INTEREST_RATE, tenureMonths) - 1;
  const monthlyRepayment = loanAmount * (numerator / denominator);

  return monthlyRepayment;
}

export const LoanCalculator = ({
  loanAmount,
  tenureMonths,
  onLoanAmountChange,
  onTenureMonthsChange,
  onMonthlyRepaymentChange
}: LoanCalculatorProps) => {
  const [inputLoanAmount, setInputLoanAmount] = useState(DEFAULT_LOAN_AMOUNT.toString())
  const [inputTenureMonths, setInputTenureMonths] = useState(DEFAULT_TENURE_MONTHS.toString())
  const monthlyRepayment = calculateMonthlyRepayment(loanAmount, tenureMonths)

  useEffect(() => {
    setInputLoanAmount(loanAmount.toString())
  }, [loanAmount])

  useEffect(() => {
    setInputTenureMonths(tenureMonths.toString())
  }, [tenureMonths])

  useEffect(() => {
    onMonthlyRepaymentChange ? onMonthlyRepaymentChange(monthlyRepayment) : undefined
  }, [loanAmount, tenureMonths])

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="loanAmount">Loan Amount</Label>
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 space-y-2 w-4/6 mt-4">
            <Slider
              value={[loanAmount]}
              min={MIN_LOAN_AMOUNT}
              max={MAX_LOAN_AMOUNT}
              step={1000}
              onValueChange={(value) => onLoanAmountChange(value[0])}
            />
            <div className="flex justify-between">
              <div className="text-muted-foreground text-xs">${MIN_LOAN_AMOUNT}</div>
              <div className="text-muted-foreground text-xs">${MAX_LOAN_AMOUNT}</div>
            </div>
          </div>
          <Input
            className="w-2/6 h-auto"
            type="number"
            min={MIN_LOAN_AMOUNT}
            max={MAX_LOAN_AMOUNT}
            value={inputLoanAmount}
            startAdornment={
              <span>$</span>
            }
            inputMode="numeric"
            onChange={({ target: { value } }) => setInputLoanAmount(value)}
            onBlur={({ target: { value } }) => {
              if (value && Number(value) >= MIN_LOAN_AMOUNT) {
                onLoanAmountChange(Number(value))
                setInputLoanAmount(value)
              } else {
                onLoanAmountChange(Number(MIN_LOAN_AMOUNT))
                setInputLoanAmount(MIN_LOAN_AMOUNT.toString())
              }
            }}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="tenureMonths">Tenure Months</Label>
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 space-y-2 w-4/6 mt-4">
            <Slider
              value={[tenureMonths]}
              min={MIN_TENURE_MONTHS}
              max={MAX_TENURE_MONTHS}
              onValueChange={(value) => onTenureMonthsChange(value[0])}
            />
            <div className="flex justify-between">
              <div className="text-muted-foreground text-xs">{MIN_TENURE_MONTHS} months</div>
              <div className="text-muted-foreground text-xs">{MAX_TENURE_MONTHS} months</div>
            </div>
          </div>
          <Input
            className="w-2/6 h-auto"
            endAdornment={
              <span>months</span>
            }
            type="number"
            min={MIN_TENURE_MONTHS}
            max={MAX_TENURE_MONTHS}
            value={inputTenureMonths}
            inputMode="numeric"
            onChange={({ target: { value } }) => setInputTenureMonths(value)}
            onBlur={({ target: { value } }) => {
              if (value && Number(value) >= MIN_TENURE_MONTHS) {
                onTenureMonthsChange(Number(value))
                setInputTenureMonths(value)
              } else {
                onTenureMonthsChange(Number(MIN_TENURE_MONTHS))
                setInputTenureMonths(MIN_TENURE_MONTHS.toString())
              }
            }}
          />
        </div>
      </div>
      <div className="flex justify-between pt-4 pr-4">
        <span>Your Monthy Payment</span>
        <span>{monthlyRepayment.toFixed(0)}</span>
      </div>
    </div>
  )
}