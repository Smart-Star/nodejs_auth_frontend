import { cn } from "@/lib/utils";

export function CustomIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://w3.org'
      viewBox='0 0 24 24' // Double check if the site uses 0 0 24 24 or 0 0 20 20!
      className={cn("w-6 h-6 fill-current", className)}
      {...props}>
      {/* Paste your copied path string right here */}
      <path d='PASTE_COPIED_PATH_HERE' />
    </svg>
  );
}
