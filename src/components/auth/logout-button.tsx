"use client";

import { toast } from "../ui/toast";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/actions/auth.actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function logOutUser() {
    startTransition(async () => {
      const result = await logoutAction();

      if (result.success) {
        toast.add({
          title: "Logged out",
          description: result.message,
        });
        router.push("/login");
        router.refresh();
      }
    });
  }

  return (
    <Button size='sm' onClick={logOutUser} disabled={isPending}>
      <LogOut className='mr-2' /> Logout
    </Button>
  );
}
