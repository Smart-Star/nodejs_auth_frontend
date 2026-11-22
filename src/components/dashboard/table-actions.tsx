"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { EditTaskDialog } from "./edit-task-dialog";
import { deleteTaskAction } from "@/actions/task.actions";
import { Trash, FilePen, EllipsisVertical } from "lucide-react";

type Props = {
  currentId: string;
};

export function TableActions({ currentId }: Props) {
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false);

  const handleEdit = async () => {
    setOpenEditTaskDialog((prev) => !prev);
  };

  const handleDelete = async () => {
    const result = await deleteTaskAction(currentId);

    toast.add({
      type: result.success ? "success" : "error",
      description: result.message,
    });
  };

  return (
    <>
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

      {openEditTaskDialog && (
        <EditTaskDialog
          taskId={currentId}
          setOpenEditTaskDialog={setOpenEditTaskDialog}
        />
      )}
    </>
  );
}
