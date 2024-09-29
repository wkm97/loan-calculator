import { LoanCalculator } from "@/components/loan-calculator"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CalendarIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { z } from "zod"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {nationalityOptions, jobIndustryOptions, loanApplicationSchema} from "shared"


function App() {
  const form = useForm<z.infer<typeof loanApplicationSchema>>({
    resolver: zodResolver(loanApplicationSchema),
    defaultValues: {
      loanAmount: 20000,
      tenureMonths: 48,
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: ""
    }
  })

  function onSubmit(values: z.infer<typeof loanApplicationSchema>) {
    console.log(values)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-6 pt-10 pb-8 w-full sm:border sm:shadow-xl sm:rounded-lg sm:px-10 sm:max-h-fit sm:max-w-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2 py-2">
              <h2 className="text-2xl font-bold tracking-tight">Loan Calculator</h2>
              <div className="p-4">
                <LoanCalculator
                  loanAmount={form.watch("loanAmount")}
                  tenureMonths={form.watch("tenureMonths")}
                  onLoanAmountChange={(v) => form.setValue("loanAmount", v)}
                  onTenureMonthsChange={(v) => form.setValue("tenureMonths", v)}
                  onMonthlyRepaymentChange={(v) => form.setValue("monthyRepayment", v)}
                />
              </div>
            </div>
            <Separator />
            <div className="space-y-2 py-2">
              <h2 className="text-2xl font-bold tracking-tight">Application Form</h2>
              <div className="space-y-4 p-4">
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
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[250px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
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
                          {jobIndustryOptions.map(({ value, text }) => <SelectItem key={value} value={value}>{text}</SelectItem>)}
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
                          {nationalityOptions.map(({ value, text }) => <SelectItem key={value} value={value}>{text}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="container">Apply</Button>
          </form>
        </Form>
      </div>
    </div >
  )
}

export default App
