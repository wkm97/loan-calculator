import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { MAX_LOAN_AMOUNT, MAX_TENURE_MONTHS, MIN_LOAN_AMOUNT, MIN_TENURE_MONTHS } from "shared"

interface LoanCalculatorProps {
  loanAmount: number
  tenureMonths: number
  onLoanAmountChange: (value: number) => void
  onTenureMonthsChange: (value: number) => void
  onMonthlyRepaymentChange?: (value: number) => void
}

export const calculateMonthlyRepayment = (loanAmount: number, tenureMonths: number) => {
  const monthlyInterestRate = 0.005575
  const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths);
  const denominator = Math.pow(1 + monthlyInterestRate, tenureMonths) - 1;
  const monthlyRepayment = loanAmount * (numerator / denominator);

  return Math.round(monthlyRepayment * 100 + Number.EPSILON) / 100;
}

const stepArray = (min: number, max: number, steps: number) => Array.from({ length: steps }, (_, i) => ((max - min) / (steps - 1)) * i + min)

const loanAmountScale = [...stepArray(1000, 50000, 50), ...stepArray(55000, 100000, 10), ...stepArray(110000, 200000, 10)]

const getClosest = (arr: number[], target: number) => {
  return arr.reduce((closest, num) => {
    return Math.abs(num - target) < Math.abs(closest - target) ? num : closest;
  });
}

export const LoanCalculator = ({
  loanAmount,
  tenureMonths,
  onLoanAmountChange,
  onTenureMonthsChange,
  onMonthlyRepaymentChange
}: LoanCalculatorProps) => {
  const [inputLoanAmount, setInputLoanAmount] = useState(loanAmount.toLocaleString())
  const [inputTenureMonths, setInputTenureMonths] = useState(tenureMonths.toString())
  const monthlyRepayment = calculateMonthlyRepayment(loanAmount, tenureMonths)

  useEffect(() => {
    setInputLoanAmount(loanAmount.toLocaleString())
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
              value={[loanAmountScale.indexOf(getClosest(loanAmountScale, loanAmount))]}
              min={0}
              max={69}
              step={1}
              onValueChange={(value) => onLoanAmountChange(loanAmountScale[value[0]])}
            />
            <div className="flex justify-between">
              <div className="text-muted-foreground text-xs">${MIN_LOAN_AMOUNT}</div>
              <div className="text-muted-foreground text-xs">${MAX_LOAN_AMOUNT}</div>
            </div>
          </div>
          <Input
            className="w-2/6 h-auto"
            value={inputLoanAmount}
            startAdornment={
              <span>$</span>
            }
            onChange={({ target: { value } }) => setInputLoanAmount(value.replace(/[^0-9.]/g, ''))}
            onBlur={({ target: { value } }) => {
              if (!value) {
                onLoanAmountChange(MIN_LOAN_AMOUNT)
              } else {
                const clampValue = Math.max(MIN_LOAN_AMOUNT, Math.min(Number(value.replace(/[^0-9.]/g, '')), MAX_LOAN_AMOUNT))
                const closestValue = getClosest(loanAmountScale, clampValue)
                setInputLoanAmount(closestValue.toLocaleString())
                onLoanAmountChange(closestValue)
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
            type="number"
            className="w-2/6 h-auto"
            endAdornment={
              <span>months</span>
            }
            value={inputTenureMonths}
            onChange={({ target: { value } }) => setInputTenureMonths(value)}
            onBlur={({ target: { value } }) => {
              if (!value) {
                onTenureMonthsChange(MIN_TENURE_MONTHS)
              } else {
                onTenureMonthsChange(Math.max(MIN_TENURE_MONTHS, Math.min(Number(value), MAX_TENURE_MONTHS)))
              }
            }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 pr-4">
        <span className="font-bold text-lg">Your Monthy Payment</span>
        <span className="font-bold text-3xl text-primary">$ {monthlyRepayment.toFixed(0)}</span>
      </div>
    </div>
  )
}
