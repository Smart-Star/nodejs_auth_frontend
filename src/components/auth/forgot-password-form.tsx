"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { SubmitButton } from "./submit-button";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { forgotPasswordAction } from "@/actions/auth.actions";
import { forgotPasswordSchema } from "@/validation/auth.schema";
import { ForgotPasswordSuccess } from "./forgot-password-success";
import { forgot_password_form_control } from "../constants/auth.constants";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    startTransition(async () => {
      const result = await forgotPasswordAction(data);
      if (!result.success) {
        toast.add({
          type: "error",
          title: result.message,
        });
        return;
      }

      // save reset token so we can display it in the success page
      if (result.resetPasswordToken) setResetToken(result.resetPasswordToken);

      // show the success page
      setIsEmailSubmitted(true); // if success
    });
  }

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          {/* show success page */}
          {isEmailSubmitted ? (
            <ForgotPasswordSuccess
              resetToken={resetToken}
              email={form.getValues("email")}
            />
          ) : (
            <form className='p-6 md:p-8' onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className='flex flex-col items-center gap-2 text-center'>
                  <h1 className='text-2xl font-bold'>Forgot password</h1>
                  <p className='text-sm text-balance text-muted-foreground'>
                    Enter your email address to get a password link
                  </p>
                </div>

                {forgot_password_form_control.map((formControl) => (
                  <Controller
                    key={formControl.id}
                    name={formControl.id}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={formControl.id}>
                          {formControl.title}
                        </FieldLabel>
                        <Input
                          {...field}
                          id={formControl.id}
                          type={formControl.type}
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
                    buttonText='Submit'
                    loadingText='Submiting...'
                  />
                </Field>

                <FieldDescription className='text-center'>
                  Remember password? Go back to{" "}
                  <Link href='/login'>Sign in</Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          )}

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
