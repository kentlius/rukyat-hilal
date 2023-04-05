"use client";

import { useState } from "react";
import { Photo } from "@/interfaces/photo";

export default function HilalCarousel (
  { images }: {
    images: Photo[],
  }
) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // go to previous slide
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // go to next  slide
  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // go to specific slide
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[1400px] h-5/6 md:h-[95%] w-full m-auto py-16 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${images[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <div className="font-semibold" onClick={prevSlide}>
          {`<`} 
        </div>
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <div className="font-semibold" onClick={nextSlide}>
          {`>`} 
        </div>
      </div>
      <div className='flex top-4 justify-center py-2'>
        {images.map((image, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer
              ${currentIndex === slideIndex ? "" : "text-white"}
            `}
          >
            <>_&nbsp;</> 
          </div>
        ))}
      </div>
    </div>
  );
}
