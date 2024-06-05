"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import envConfig from "@/config"
import { error } from "console"
import { useToast } from "@/components/ui/use-toast"
 
const formSchema = z.object({
  username: z.string().min(2).max(50),
})

type FormValues = z.infer<typeof formSchema>

const LoginForm = () => {
        const {toast} = useToast()
        // 1. Define your form.
        const form = useForm<LoginBodyType>({
            resolver: zodResolver(LoginBody),
            defaultValues: {
            email: "",
            password: ""
            },
        })
        
        // 2. Define a submit handler.
         async function onSubmit(values: LoginBodyType) {
            // Do something with the form values.
            // ✅ This will be type-safe and validated.
            try {
              const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
              }).then(async (res) => {
                  const payload = await res.json()
                  const data = {
                    status: res.status,
                    payload
                  }

                  if(!res.ok){
                    throw data
                  }

                  return data
                })

                toast({
                  description: result.payload.message,
                })
            } catch (error: any) {
              const errors = error.payload.errors as {
                field: string, message: string
              }[]
              const status = error.status as number

              if(status == 422) {
                errors.forEach(error => {
                      form.setError(error.field as 'email' | 'password', {
                        type: 'server',
                        message: error.message
                      })
                  
                });
                toast({
                  title: "Đăng nhập lại!",
                  description: error.payload.message,
                  variant: "destructive"
                })
              } else {
                toast({
                  title: "Lỗi",
                  description: error.payload.message,
                  variant: "destructive"
                })
              }

            }
            
        }
        return (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[400px] w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="hoapham@gmail.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Đăng nhập</Button>
              </form>
            </Form>
          )
}

export default LoginForm