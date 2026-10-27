import { getSession } from "@/lib/session";
import Avatar from "boring-avatars";

export async function UserProfile() {
  const user = await getSession();

  if (!user) return null;

  return (
    <div className='flex items-center gap-3 p-2 rounded-lg'>
      <div className='flex flex-col overflow-hidden'>
        <span className='font-medium text-sm truncate'>{user.email}</span>
        <span className='text-xs text-muted-foreground uppercase text-right'>
          {user.role}
        </span>
      </div>

      <Avatar
        className='border-2 border-primary rounded-full'
        size={40}
        name={user.userId} // Uses the userId as the seed for the design
        variant='marble' // Options: "marble", "beam", "pixel", "sunset", "ring", "bauhaus"
      />
    </div>
  );
}
