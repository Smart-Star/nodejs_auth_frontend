"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import * as z from "zod";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "../auth/submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { taskSchema } from "@/validation/tasks.schema";
import { useEditTask, useGetSingleTask } from "@/hooks/use-tasks";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";

type Props = {
  taskId: string;
  setOpenEditTaskDialog: (openEditTaskDialog: boolean) => void;
};

export function EditTaskDialog({ taskId, setOpenEditTaskDialog }: Props) {
  const editTaskMutation = useEditTask();
  const { data: currentTask } = useGetSingleTask(taskId);

  console.log("currentTask:", currentTask?.title);

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    values: {
      title: currentTask?.title ?? "",
    },
  });

  function onSubmit(data: z.infer<typeof taskSchema>) {
    const normalizedTitle = data.title.trim();

    editTaskMutation.mutate(
      { taskId, taskTitle: normalizedTitle },
      {
        onSuccess: (result) => {
          setOpenEditTaskDialog(false);
          toast.add({
            type: "success",
            description: result.message,
          });
        },
        onError: (error) => {
          toast.add({
            type: "error",
            description: error.message,
          });
        },
      },
    );
  }

  if (!currentTask?.title) return null;

  return (
    <Dialog open onOpenChange={setOpenEditTaskDialog}>
      <DialogContent className='sm:max-w-sm'>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id='title'
                    name='title'
                    aria-invalid={fieldState.invalid}
                    placeholder='Enter new task title'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type='button'
                  className='w-fit'
                  onClick={() => setOpenEditTaskDialog(false)}
                  variant='outline'>
                  Cancel
                </Button>
              }
            />
            <SubmitButton
              isPending={editTaskMutation.isPending}
              buttonText='Save changes'
              loadingText='Saving...'
              className='w-fit'
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
