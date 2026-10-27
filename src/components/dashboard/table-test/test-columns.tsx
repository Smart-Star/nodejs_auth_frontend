"use client";

import { z } from "zod";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DragHandle } from "./drag-handle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { type TestDataTableFeatures } from "./test-table-features";
import { CircleCheck, EllipsisVertical, Loader } from "lucide-react";

export const testTableableColumnSchema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<
  TestDataTableFeatures,
  z.infer<typeof testTableableColumnSchema>
>();

export const testColumns = columnHelper.columns([
  columnHelper.display({
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  }),

  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("header", {
    header: "Header",
    cell: ({ row }) => {
      return row.original.header;
      // <div className='text-right font-medium'>{row.original.header}</div>;
    },
    enableHiding: false,
  }),

  columnHelper.accessor("type", {
    header: "Section Type",
    cell: ({ row }) => (
      <div className='w-32'>
        <Badge variant='outline' className='px-1.5 text-muted-foreground'>
          {row.original.type}
        </Badge>
      </div>
    ),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant='outline' className='px-1.5 text-muted-foreground'>
        {row.original.status === "Done" ? (
          <CircleCheck className='fill-green-500 dark:fill-green-400' />
        ) : (
          <Loader />
        )}
        {row.original.status}
      </Badge>
    ),
  }),

  columnHelper.display({
    id: "actions",
    cell: () => (
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
]);
