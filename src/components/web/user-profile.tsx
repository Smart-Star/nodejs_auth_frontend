import Avatar from "boring-avatars";
import { UserJwtPayload } from "@/types/user.types";

export function UserProfile({ email, role, userId }: UserJwtPayload) {
  if (!email && !role && userId) return null;

  return (
    <div className='flex items-center justify-center gap-3'>
      <div className='flex flex-col overflow-hidden'>
        <span className='font-semibold text-sm truncate'>{email}</span>
        <span className='bg-primary w-fit ml-auto rounded-full px-2 text-xs text-white lowercase text-right'>
          {role}
        </span>
      </div>

      <Avatar
        className='border-2 border-accent rounded-full'
        square
        size={35}
        name={userId} // Uses the userId to generate the gradient
        variant='marble' // marble, beam, pixel, sunset, ring, bauhaus
      />
    </div>
  );
}
