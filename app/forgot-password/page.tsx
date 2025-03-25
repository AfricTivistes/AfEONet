"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    console.log(values)
    // Ici, vous implémenteriez la logique de récupération de mot de passe
    setIsSubmitted(true)
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <div className="w-full max-w-md">
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Image src="/logo-yellow-on-teal.jpeg" alt="AfEONet Logo" width={60} height={60} className="rounded-md" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">Forgot Password</CardTitle>
            <CardDescription>
              {!isSubmitted
                ? "Enter your email address and we'll send you a link to reset your password"
                : "Check your email for a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="name@example.com" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-secondary text-primary hover:bg-secondary/90">
                    Send reset link
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center py-4">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <p className="mb-4">
                  We've sent a password reset link to your email address. Please check your inbox and follow the
                  instructions to reset your password.
                </p>
                <p className="text-sm text-muted-foreground">
                  If you don't receive an email within a few minutes, check your spam folder or try again.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" asChild>
              <Link href="/login" className="flex items-center gap-1 text-primary">
                <ArrowLeft className="h-4 w-4" /> Back to login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

