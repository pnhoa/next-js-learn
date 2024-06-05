"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import envConfig from "@/config"
 
const formSchema = z.object({
  username: z.string().min(2).max(50),
})

type FormValues = z.infer<typeof formSchema>

const RegisterForm = () => {
        // 1. Define your form.
        const form = useForm<RegisterBodyType>({
            resolver: zodResolver(RegisterBody),
            defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
            },
        })
        
        // 2. Define a submit handler.
         async function onSubmit(values: RegisterBodyType) {
            // Do something with the form values.
            // ✅ This will be type-safe and validated.
            console.log(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`)
            const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then((res) => res.json())

            console.log(result)
        }
        return (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[400px] w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input placeholder="hoapham123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhập lại mật khẩu</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Đăng ký</Button>
              </form>
            </Form>
          )
}

export default RegisterForm