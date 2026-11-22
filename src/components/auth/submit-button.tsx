import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";
import { Button } from "@/components/ui/button";
import { Button as ButtonPrimitive } from "@base-ui/react/button";

type SubmitButtonProps = ButtonPrimitive.Props & {
  isPending?: boolean;
  disabled?: boolean;
  buttonText: string;
  loadingText?: string;
  className?: string;
};

export function SubmitButton({
  isPending,
  disabled,
  buttonText,
  loadingText,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type='submit'
      disabled={isPending || disabled}
      // className='w-full'
      className={cn("w-full", className)}
      {...props}>
      {isPending ? (
        <>
          <Spinner className='mr-2' />
          {loadingText}
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
}
