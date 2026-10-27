"use client";

import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { TableActions } from "./table-actions";
import { CircleCheck, Loader } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { taskSchema } from "@/validation/task.schema";
import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<
  DataTableFeatures,
  z.infer<typeof taskSchema>
>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <div className='pl-4 flex items-center justify-center'>
        <Checkbox
          className='border border-foreground/30'
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
      <div className='pl-4 flex items-center justify-center'>
        <Checkbox
          className='border border-foreground/30'
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.display({
    id: "id",
    // header: () => null,
    header: () => <div className='text-center'>S/N</div>,
    cell: ({ row }) => {
      return <div className='text-center'>{row.original.id}</div>;
    },
  }),

  columnHelper.accessor("header", {
    header: "Header",
    cell: ({ row }) => {
      return row.original.header;
    },
    enableHiding: false,
  }),

  columnHelper.accessor("type", {
    header: "Section Type",
    cell: ({ row }) => (
      <div className='w-32'>
        <Badge variant='outline' className='p-2.5 text-muted-foreground'>
          {row.original.type}
        </Badge>
      </div>
    ),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant='outline' className='p-2.5 text-muted-foreground'>
        {row.original.status === "Done" ? (
          <CircleCheck className='text-green-500 dark:text-green-400' />
        ) : (
          <Loader />
        )}
        {row.original.status}
      </Badge>
    ),
  }),

  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <TableActions currentId={row.original.id} />,
  }),
]);
