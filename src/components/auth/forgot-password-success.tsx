"use client";

import Link from "next/link";
import { toast } from "@/components/ui/toast";
import { MailIcon } from "../icons/mail-icon";
import { SubmitButton } from "./submit-button";
import { useEffect, useState, useTransition } from "react";
import { forgotPasswordAction } from "@/actions/auth.actions";
import { Field, FieldDescription, FieldGroup } from "../ui/field";
import { COUNTDOWN_TIMER_LENGTH } from "../constants/auth.constants";

type Props = {
  email: string;
  resetToken: string | null;
};

export function ForgotPasswordSuccess({ email, resetToken }: Props) {
  const [isPending, startTransition] = useTransition();
  const [currentResetToken, setCurrentResetToken] = useState(resetToken);
  const [countdownTimer, setCountdownTimer] = useState(COUNTDOWN_TIMER_LENGTH);

  useEffect(() => {
    if (countdownTimer <= 0) return;

    const timer = setInterval(() => {
      setCountdownTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownTimer]);

  async function handleResend() {
    if (countdownTimer > 0 || isPending) return;

    startTransition(async () => {
      const result = await forgotPasswordAction({ email });
      if (!result.success) {
        toast.add({
          type: "error",
          title: result.message,
        });
        return;
      }

      if (result.resetPasswordToken) {
        setCurrentResetToken(result.resetPasswordToken);
      }

      toast.add({
        type: "success",
        title: "Email sent successfully.",
      });

      // reset the countdown timer
      setCountdownTimer(COUNTDOWN_TIMER_LENGTH);
    });
  }

  return (
    <div className='flex flex-col items-center p-6 md:p-8'>
      <FieldGroup>
        <div className='flex flex-col items-center gap-4 text-center'>
          <div className='flex items-center justify-center size-20 p-2 rounded-full bg-muted-foreground/10'>
            <MailIcon className='size-10 text-primary' />
          </div>

          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>Check your email</h1>
            <p className='text-sm text-balance text-muted-foreground'>
              A password reset link has been sent to{" "}
              <span className='text-foreground font-medium'>{email}</span>.
              Please check your inbox.
            </p>
          </div>
        </div>

        {/* Local Dev Mode Simulation Link Box */}
        {currentResetToken && (
          <div className='p-3 bg-muted/50 border rounded-lg text-center text-xs break-all'>
            <p className='font-semibold text-foreground mb-1'>
              🛠️ Local Dev Simulation:
            </p>
            <Link
              href={`/reset-password?token=${currentResetToken}&email=${encodeURIComponent(email)}`}
              className='text-primary underline font-medium hover:opacity-80'>
              Click here to open the reset password page
            </Link>
          </div>
        )}

        <Field>
          <SubmitButton
            onClick={handleResend}
            isPending={isPending}
            disabled={countdownTimer > 0}
            buttonText='Resend Email'
            loadingText='Sending...'
          />
        </Field>

        <FieldDescription className='text-center'>
          Didn't receive the email?{" "}
          {countdownTimer > 0 && (
            <>
              Wait{" "}
              <span className='text-foreground font-medium'>
                {countdownTimer}s
              </span>
            </>
          )}
        </FieldDescription>
      </FieldGroup>
    </div>
  );
}
