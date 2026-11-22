"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { UserProfile } from "./user-profile";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { formatPathToTitle } from "@/lib/utils";
import { Notifications } from "./notifications";
import { Button } from "@/components/ui/button";
import { UserJwtPayload } from "@/types/user.types";
import { tasks_data } from "../constants/dashboard.constants";
import { sidebar_nav_links } from "../constants/dashboard.constants";

type Props = {
  user?: UserJwtPayload | null;
};

export function Header({ user }: Props) {
  const pathname = usePathname();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleNotificationPanel = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  // check if current path is in nav links array
  const matchedLink = sidebar_nav_links.find(
    ({ href }) =>
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)),
  );

  // Use the nav link label, or fall back to the formatted path
  const currentPageLabel = matchedLink?.title ?? formatPathToTitle(pathname);

  return (
    <header className='flex h-16 shrink-0 border-b border-border/50'>
      <div className='flex w-full items-center justify-between px-6'>
        <h1 className='font-semibold text-xl'>{currentPageLabel}</h1>

        <div className='ml-auto flex items-center gap-4'>
          {user && (
            <UserProfile
              email={user.email}
              role={user.role}
              userId={user.userId}
            />
          )}

          <ThemeToggle />

          <div className='relative'>
            <Button
              variant='outline'
              size='icon'
              onClick={toggleNotificationPanel}>
              <Bell className='size-[1.2rem]' />
              {tasks_data && tasks_data.length > 0 && (
                <span className='absolute -top-1 -right-1 bg-primary size-2.5 rounded-full' />
              )}
            </Button>

            {tasks_data && tasks_data.length > 0 && isNotificationsOpen && (
              <Notifications
                tasks={tasks_data}
                setIsNotificationsOpen={setIsNotificationsOpen}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
