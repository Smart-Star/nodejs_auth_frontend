"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { carousel_images } from "../constants/dashboard.constants";

export function Gallery() {
  const plugin = useMemo(
    () => Autoplay({ delay: 4000, stopOnInteraction: true }),
    [],
  );

  return (
    // <Carousel className='w-full max-w-[12rem] sm:max-w-xs'>
    <Carousel
      className='w-full overflow-hidden'
      plugins={[plugin]}
      onMouseEnter={plugin.stop}
      onMouseLeave={plugin.reset}>
      <CarouselContent>
        {carousel_images.map((img) => (
          <CarouselItem key={img}>
            <Card className='p-0'>
              <CardContent className='flex aspect-vide h-72 items-center justify-center p-0'>
                <Image
                  width={1000}
                  height={1000}
                  src={`/carousel-images/${img}`}
                  alt={img}
                  className='size-full object-cover'
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-8' />
      <CarouselNext className='right-8' />
    </Carousel>
  );
}
