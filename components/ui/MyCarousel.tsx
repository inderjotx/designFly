import * as React from "react"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function MyCarousel({ files }: { files: any[] }) {
    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {files.map((file: any, index: number) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <Image src={URL.createObjectURL(file)} alt='canvas images' width={100} height={100} className='object-contain  w-full h-full ' quality={100} />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious type="button" />
            <CarouselNext type="button" />
        </Carousel>
    )
}
