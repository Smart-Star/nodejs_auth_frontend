"use client";

import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "../icons/google-icon";
import { loginAction } from "@/actions/auth.actions";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/auth.schema";
import { Card, CardContent } from "@/components/ui/card";
import { login_form_control } from "../constants/auth.constants";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldDescription,
} from "@/components/ui/field";

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const result = await loginAction(data);

      if (result.success) {
        toast.add({
          title: "Account logged in successfully.",
          description: `welcome @${data.email}`,
        });

        router.push("/");
        router.refresh();
      } else {
        toast.add({
          type: "error",
          title: "Login Failed",
          description: result.message,
        });
      }
    });
  }

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Welcome back</h1>
                <p className='text-sm text-balance text-muted-foreground'>
                  Enter your email below to login to your account
                </p>
              </div>

              {login_form_control.map((formControl) => (
                <Controller
                  key={formControl.id}
                  name={formControl.id}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className='flex items-center'>
                        <FieldLabel htmlFor={formControl.id}>
                          {formControl.title}
                        </FieldLabel>
                        <Link
                          href='/reset-password'
                          className={
                            formControl.id !== "password"
                              ? "hidden"
                              : "ml-auto text-sm underline-offset-2 hover:underline opacity-70"
                          }>
                          Forgot your password?
                        </Link>
                      </div>
                      <Input
                        {...field}
                        id={formControl.id}
                        aria-invalid={fieldState.invalid}
                        placeholder={formControl.placeholder}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              ))}

              <Field>
                <SubmitButton
                  isPending={isPending}
                  buttonText='Login'
                  loadingText='Logging in...'
                />
              </Field>
              <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
                Or continue with
              </FieldSeparator>
              <Field>
                <Button variant='outline' type='button'>
                  <GoogleIcon /> Google
                  <span className='sr-only'>Sign up with Google</span>
                </Button>
              </Field>

              <FieldDescription className='text-center'>
                Don&apos;t have an account? <Link href='/signup'>Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className='relative hidden bg-card md:block p-3'>
            <Image
              src='/bg.jpg'
              alt='signup-image'
              width={500}
              height={500}
              className='rounded-lg size-full'
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className='px-6 text-center'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{" "}
        and <a href='#'>Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
