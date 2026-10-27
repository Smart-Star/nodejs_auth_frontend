export { cn } from "cn";

// format raw paths nicely if not in nav_links
export function formatPathToTitle(pathname: string): string {
  // grab last part of the path (/user-settings -> user-settings)
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments.at(-1);

  if (!lastSegment) return "Dashboard";

  // replace hyphens and underscores with spaces
  const spacedText = lastSegment.replace(/[-_]/g, " ");

  // capitalize the first letter of each word
  return spacedText.replace(/\b\w/g, (char) => char.toUpperCase());
}
