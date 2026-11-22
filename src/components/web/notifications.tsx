"use client";

import { Button } from "../ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";

type Tasts = {
  id: string;
  description: string;
  created_at: string;
};

type Props = {
  tasks: Tasts[];
  setIsNotificationsOpen: (isOpen: boolean) => void;
};

export function Notifications({ setIsNotificationsOpen, tasks }: Props) {
  const router = useRouter();

  const handleButtonClick = () => {
    setIsNotificationsOpen(false);
    router.push("/tasks");
  };

  return (
    <Card className='absolute bg-background w-2xs top-[3.1rem] right-0 rounded-lg p-1 gap-0'>
      {tasks.map((item) => (
        <Button
          key={item.id}
          onClick={handleButtonClick}
          className='bg-transparent hover:bg-muted/40 items-center justify-between text-foreground/70 rounded-md border-none gap-8 h-11 px-2 pr-3'>
          <div className='text-left -space-y-px'>
            <h3 className='font-medium text-sm text-foreground/90'>New task</h3>
            <p className='font-light text-xs truncate max-w-36'>
              {item.description}
            </p>
          </div>
          <p className='font-light text-xs italic'>
            {formatDistanceToNowStrict(new Date(item.created_at), {
              addSuffix: true,
            })}
          </p>
        </Button>
      ))}
    </Card>
  );
}
