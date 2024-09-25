import { Button } from '@/components/ui/button'
import { LoanCalculator } from '@/components/loan-calculator'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
} from "@/components/ui/form"
import { z } from "zod"
import { formSchema } from "@/lib/form"


function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 20000,
      tenureMonths: 48
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border px-6 pt-10 pb-8 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="space-y-6">
          <p>Loan application form with monthly repayment calculator</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <LoanCalculator
                loanAmount={form.watch("loanAmount")}
                tenureMonths={form.watch("tenureMonths")}
                onLoanAmountChange={(v) => form.setValue("loanAmount", v)}
                onTenureMonthsChange={(v) => form.setValue("tenureMonths", v)}
                onMonthlyRepaymentChange={(v) => form.setValue("monthyRepayment", v)}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default App
