import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function Gallery() {
  return (
    // <Carousel className='w-full max-w-[12rem] sm:max-w-xs'>
    <Carousel className='w-full overflow-hidden'>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card className='p-0'>
              <CardContent className='flex aspect-vide h-56 items-center justify-center p-0'>
                <Image
                  width={1000}
                  height={1000}
                  src='/bg.jpg'
                  alt='carousel_img'
                  className='size-full object-cover'
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {}
      <CarouselPrevious className='left-8' />
      <CarouselNext className='right-8' />
    </Carousel>
  );
}
