"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FlexRender,
  useTable,
  type RowData,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type ColumnVisibilityState,
} from "@tanstack/react-table";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { DraggableRow } from "./draggable-row";
import { Button } from "@/components/ui/button";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { features, type TestDataTableFeatures } from "./test-table-features";

interface TestDataTableProps<TData extends RowData & { id: string | number }> {
  columns: ColumnDef<TestDataTableFeatures, TData>[];
  data: TData[];
}

export function TestDataTable<TData extends RowData & { id: string | number }>({
  columns,
  data,
}: TestDataTableProps<TData>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  );
  const table = useTable({
    features,
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  });

  return (
    <main>
      {/*  */}
      <div className='overflow-hidden rounded-lg border'>
        <Table>
          <TableHeader className='sticky top-0 z-10 bg-muted'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <FlexRender header={header} />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='**:data-[slot=table-cell]:first:w-8'>
            {table.getRowModel().rows?.length ? (
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}>
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </SortableContext>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between px-4'>
        <div className='hidden flex-1 text-sm text-muted-foreground lg:flex'>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='flex w-full items-center gap-8 lg:w-fit'>
          <div className='hidden items-center gap-2 lg:flex'>
            <Label htmlFor='rows-per-page' className='text-sm font-medium'>
              Rows per page
            </Label>
            <Select
              value={`${table.state.pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}>
              <SelectTrigger size='sm' className='w-20' id='rows-per-page'>
                <SelectValue placeholder={table.state.pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side='top'>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-fit items-center justify-center text-sm font-medium'>
            Page {table.state.pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className='ml-auto flex items-center gap-2 lg:ml-0'>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              <span className='sr-only'>Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant='outline'
              className='size-8'
              size='icon'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <span className='sr-only'>Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant='outline'
              className='size-8'
              size='icon'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <span className='sr-only'>Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant='outline'
              className='hidden size-8 lg:flex'
              size='icon'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              <span className='sr-only'>Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
      {/*  */}
    </main>
  );
}
