import { Spinner } from "../ui/spinner";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  isPending: boolean;
  buttonText: string;
  loadingText?: string;
};

export function SubmitButton({
  isPending,
  buttonText,
  loadingText,
}: SubmitButtonProps) {
  return (
    <Button type='submit' disabled={isPending} className='w-full'>
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
