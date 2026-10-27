import { CSS } from "@dnd-kit/utilities";
import { features } from "./test-table-features";
import { useSortable } from "@dnd-kit/sortable";
import { TableCell, TableRow } from "@/components/ui/table";
import { FlexRender, type Row, type RowData } from "@tanstack/react-table";

export function DraggableRow<TData extends RowData>({
  row,
}: {
  row: Row<typeof features, TData>;
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  });
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className='relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80'
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          <FlexRender cell={cell} />
        </TableCell>
      ))}
    </TableRow>
  );
}
