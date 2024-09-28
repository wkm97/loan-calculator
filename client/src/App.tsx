import { Button } from '@/components/ui/button'
import { LoanCalculator } from '@/components/loan-calculator'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { formSchema } from "@/lib/form"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import jobIndustries from "@/lib/job-industries"
import nationalities from "@/lib/nationalities"
 


function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 20000,
      tenureMonths: 48,
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: ""
    }
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <LoanCalculator
                loanAmount={form.watch("loanAmount")}
                tenureMonths={form.watch("tenureMonths")}
                onLoanAmountChange={(v) => form.setValue("loanAmount", v)}
                onTenureMonthsChange={(v) => form.setValue("tenureMonths", v)}
                onMonthlyRepaymentChange={(v) => form.setValue("monthyRepayment", v)}
              />
              <Separator />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobIndustry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Industry</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a job industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobIndustries.map(({ value, text }) => <SelectItem key={value} value={value}>{text}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a nationality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nationalities.map(({ value, text }) => <SelectItem key={value} value={value}>{text}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
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
