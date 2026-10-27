import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { section_cards } from "@/components/constants/dashboard.constants";

export function SectionCards() {
  return (
    <div className='w-full grid grid-cols-1 gap-6 md:grid-cols-4'>
      {section_cards.map((card) => (
        <Card key={card.title} className='@container/card shadow-sm'>
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <card.trendIcon />
                {card.trend}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              {card.summary} <card.trendIcon className='size-4' />
            </div>
            <div className='text-muted-foreground'>{card.description}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
