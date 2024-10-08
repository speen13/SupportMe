'use client'

import {CalendarIcon, PersonStandingIcon} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {format} from "date-fns";
import {PasswordInput} from "@/components/ui/password-input";
import {Checkbox} from "@/components/ui/checkbox";
import {useRouter} from "next/navigation";

const accountTypeSchema = z.object({
    accountType: z.enum(['personal', 'company']),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number().optional(),
}).superRefine((data, ctx) => {
    if (data.accountType === 'company' && !data.companyName) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['companyName'],
            message: 'Company name is required for company accounts.',
        });
    }
    if (data.accountType === 'company' && !data.numberOfEmployees || data.numberOfEmployees < 1) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['numberOfEmployees'],
            message: 'Number of employees is required for company accounts.',
        });
    }
})

const passwordSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters')
        .refine((password) => {
            //один специальный символ и одна буква в верхнем регистре обязательны
            return /[A-Z]/.test(password)
        }, 'пароль должен содержать минимум одну букву в верхнем регистре обязательны'),
    passwordConfirm: z.string(),
}).superRefine((data, ctx) => {

    if(data.password !== data.passwordConfirm) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['passwordConfirm'],
            message: 'Passwords do not match.',
        })
    }


})

const baseSchema = z.object({
    email: z.string().email(),
    acceptTerms: z.boolean({
        required_error: 'You must accept the terms and conditions',
    }).refine((checked) => checked, 'You must accept the terms and conditions'),
    dob: z.date().refine((date) => {
        const toDay = new Date();
        const age = new Date(
            toDay.getFullYear() - 18,
            toDay.getMonth(),
            toDay.getDate()
        );
        return date <= age
    }, 'You must be at least 18 years old'),

})

const formSchema = baseSchema.and(passwordSchema).and(accountTypeSchema)

export default function SignUpPage() {

const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
            companyName: '',


        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
        router.push('/dashboard')

    }

const accountType = form.watch('accountType')


const dobFromDate = new Date()
    dobFromDate.setFullYear(dobFromDate.getFullYear() - 120)

    return (
        <>
            <PersonStandingIcon size={50}/>
            <Card className='w-full max-w-sm '>
                <CardHeader>
                    <CardTitle>
                        Sign Up
                    </CardTitle>
                    <CardDescription>
                        Sign up for a new SupportMe account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>



                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder='jonh@doe.com' type='email' {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="accountType"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>
                                        Account Type
                                    </FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select an account type'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='personal'>
                                                    Personal
                                                </SelectItem>
                                                <SelectItem value='company'>
                                                    Company
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            {accountType === 'company' &&
                            <>

                              <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='company name'  {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="numberOfEmployees"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employees</FormLabel>
                                        <FormControl>
                                            <Input value={field.value ?? ''} type='number' min={0} placeholder='Employees'  {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                              />
                            </>
                            }
                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col pt-2'>
                                        <FormLabel>Date of birth</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant='outline' className='normal-case flex justify-between pr-1'>
                                                        {!!field.value ? format(field.value, 'PPP') : <span> Pick a date</span>}
                                                        <CalendarIcon />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent align='start' className='w-auto p-0'>
                                               <Calendar
                                                   mode='single'
                                                   defaultMonth={field.value}
                                                   selected={field.value}
                                                   onSelect={field.onChange}
                                                   fixedWeeks
                                                   weekStartsOn={1}
                                                   fromDate={dobFromDate}
                                                   toDate={new Date()}
                                                   captionLayout='dropdown-buttons'
                                               />
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder='********' type='password' {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="passwordConfirm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder='********' type='password' {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="acceptTerms"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex gap-2 items-center'>
                                            <FormControl>
                                               <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                                            </FormControl>
                                            <FormLabel>I accept the terms and conditions</FormLabel>
                                        </div>
                                        <FormDescription>
                                            By signing up you agree to our <Link className='text-primary hover:underline' href='/terms'>terms and conditions</Link>
                                        </FormDescription>


                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <Button type='submit'>Sign up</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='justify-between'>
                    <small>Already have an account?</small>
                    <Button variant='outline' size='sm' asChild>
                        <Link href='/login'>
                            Login
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}