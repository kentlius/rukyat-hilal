"use client";

import { useState } from "react";
import { Photo } from "@/interfaces/photo";

export default function HilalCarousel({ images }: { images: Photo[] }) {
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
    <div className="group relative m-auto h-5/6 w-full max-w-[1400px] px-4 py-16 md:h-[95%]">
      <div
        style={{ backgroundImage: `url(${images[currentIndex].url})` }}
        className="h-full w-full rounded-2xl bg-cover bg-center duration-500"
      ></div>
      {/* Left Arrow */}
      <div className="absolute left-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
        <div className="font-semibold" onClick={prevSlide}>
          {`<`}
        </div>
      </div>
      {/* Right Arrow */}
      <div className="absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
        <div className="font-semibold" onClick={nextSlide}>
          {`>`}
        </div>
      </div>
      <div className="top-4 flex justify-center py-2">
        {images.map((image, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer text-2xl
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
