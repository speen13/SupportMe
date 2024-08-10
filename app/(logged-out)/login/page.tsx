'use client'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PersonStandingIcon} from "lucide-react";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {PasswordInput} from "@/components/ui/password-input";


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export default function LoginPage() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }



    return (
       <>
           <PersonStandingIcon size={50}/>
       <Card className='w-full max-w-sm'>
           <CardHeader>
               <CardTitle>
                   Login
               </CardTitle>
               <CardDescription>
                   Login to your SupportMe account
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
                                 <FormDescription>
                                     This is your public display name.
                                 </FormDescription>
                                 <FormMessage />
                             </FormItem>
                         )}
                     />

                     <FormField name='password' control={form.control} render={({field}) =>

                         <FormItem>
                             <FormLabel>
                                 Password
                             </FormLabel>
                             <FormControl>
                                 <PasswordInput  placeholder='password' type='password' {...field}/>
                             </FormControl>

                             <FormMessage />
                         </FormItem>

                     }  />








                     <Button type='submit'>Login</Button>
                 </form>
             </Form>
           </CardContent>
           <CardFooter className='justify-between'>
<small>Don't have an account?</small>
               <Button variant='outline' size='sm' asChild>
                   <Link href='/sign-up'>
                        Sign Up
                   </Link>
               </Button>
           </CardFooter>
       </Card>
       </>
    )
}