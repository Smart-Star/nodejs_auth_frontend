import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";

export function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant='ghost'
      size='icon'
      className='size-7 text-muted-foreground hover:bg-transparent'>
      <GripVertical className='size-3 text-muted-foreground' />
    </Button>
  );
}
