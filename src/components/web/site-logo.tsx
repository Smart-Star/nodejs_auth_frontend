import { ListTodo } from "lucide-react";

export function SiteLogo() {
  return (
    <div className='flex items-center gap-2.5'>
      <span className='flex size-9 items-center justify-center p-1.5 bg-primary rounded-md shadow-md'>
        <ListTodo className='text-secondary-foreground' />
      </span>
      <h2 className='font-bold text-xl'>Taskify</h2>
    </div>
  );
}
