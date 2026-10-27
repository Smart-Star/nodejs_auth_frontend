"use client";

import { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { formatPathToTitle } from "@/lib/utils";
import { sidebar_nav_links } from "../constants/dashboard.constants";

type Props = {
  userProfile?: ReactNode; // Accept the server component as a prop
};

export function Header({ userProfile }: Props) {
  const pathname = usePathname();

  // check if current path is in nav links array
  const matchedLink = sidebar_nav_links.find(
    ({ href }) =>
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)),
  );

  // Use the nav link label, or fall back to the formatted path
  const currentPageLabel = matchedLink?.title ?? formatPathToTitle(pathname);

  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b border-border/50'>
      <div className='flex w-full items-center justify-between px-6'>
        <h1 className='font-semibold text-xl'>{currentPageLabel}</h1>

        <div className='ml-auto flex items-center gap-2'>
          {userProfile}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
