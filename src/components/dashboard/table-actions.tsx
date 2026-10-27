"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { deleteTask, editTask } from "@/actions/task.actions";
import { Trash, FilePen, EllipsisVertical } from "lucide-react";

type Props = {
  currentId: string;
};

export function TableActions({ currentId }: Props) {
  const handleEdit = async () => {
    const result = await deleteTask(currentId);

    toast.add({
      type: result.success ? "success" : "error",
      description: result.message,
    });
  };

  const handleDelete = async () => {
    const result = await editTask(currentId);

    toast.add({
      type: result.success ? "success" : "error",
      description: result.message,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant='ghost'
          className='flex size-8 text-muted-foreground data-[state=open]:bg-muted'
          size='icon'>
          <EllipsisVertical />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-32'>
        <DropdownMenuItem onClick={handleEdit}>
          <FilePen /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} variant='destructive'>
          <Trash /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
