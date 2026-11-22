"use client";

import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TableActions } from "./table-actions";
import { CircleCheck, Loader } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SupportTasks } from "@/types/tasks.types";
import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, SupportTasks>();

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
      return <div className='text-center'>{row.index + 1}</div>;
    },
  }),

  columnHelper.accessor("title", {
    header: "Title",
    cell: ({ row }) => {
      return row.original.title;
    },
    enableHiding: false,
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant='outline'
        className='p-2.5 text-muted-foreground first-letter:uppercase'>
        {row.original.status === "RESOLVED" ? (
          <CircleCheck className='text-green-500 dark:text-green-400' />
        ) : row.original.status === "IN_PROGRESS" ? (
          <Loader />
        ) : (
          ""
        )}
        {row.original.status
          .toLowerCase()
          .replaceAll("_", " ")
          .replace(/^\w/, (char) => char.toUpperCase())}
        {/* {row.original.status
          .toLowerCase()
          .replace(/^\w/, (char) => char.toUpperCase())} */}
      </Badge>
    ),
  }),

  columnHelper.accessor("created_at", {
    header: "Created At",
    cell: ({ row }) => {
      return formatDateTime(row.original.created_at);
    },
    enableHiding: false,
  }),

  columnHelper.accessor("updated_at", {
    header: "Updated At",
    cell: ({ row }) => {
      return formatDateTime(row.original.updated_at);
    },
    enableHiding: false,
  }),

  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <TableActions currentId={row.original.id} />,
  }),
]);
