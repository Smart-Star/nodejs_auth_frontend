"use client";

import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { resetPasswordSchema } from "@/validation/auth.schema";
import { reset_password_form_control } from "../constants/auth.constants";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

export function ResetPasswordForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  function onSubmit() {
    startTransition(async () => {
      toast.add({
        title: "Password updated successfully.",
        description: "You can now login with your new password",
      });
    });
  }

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Create a new password</h1>
                <p className='text-sm text-balance text-muted-foreground'>
                  Complete the form below to change your password
                </p>
              </div>

              {reset_password_form_control.map((formControl) => (
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
                  buttonText='Update Password'
                  loadingText='Updating password...'
                />
              </Field>

              <FieldDescription className='text-center'>
                Remember password? Go back to <Link href='/login'>Sign in</Link>
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
