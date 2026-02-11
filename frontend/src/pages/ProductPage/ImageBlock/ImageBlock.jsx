import clsx from "clsx";
import React, { useState } from "react";

const ImageBlock = React.memo(({ image }) => {
  const images = [image, image, image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="flex flex-col xl:flex-row gap-4 w-full lg:w-[55%] mb-4 md:mb-8">
      <img
        className="w-full aspect-square rounded-xl object-contain xl:order-1 md:max-h-[500px] lg:max-h-[580px] transition-all duration-300"
        src={images[activeImageIndex]}
        alt="product-main"
      />

      <div className="flex xl:flex-col gap-4 w-full lg:w-auto justify-center">
        {images.map((img, i) => (
          <img
            key={i}
            className={clsx(
              "w-[30%] lg:w-auto lg:flex-1 aspect-square rounded-xl object-contain max-h-[180px] lg:max-h-[150px] xl:max-h-[200px] cursor-pointer transition-all",
              {
                "shadow-xl scale-105 brightness-110 ring-1 ring-main-grey ring-opacity-30":
                  activeImageIndex === i,
                "opacity-70 hover:opacity-100": activeImageIndex !== i,
              }
            )}
            src={img}
            alt={`product-preview-${i}`}
            onClick={() => setActiveImageIndex(i)}
          />
        ))}
      </div>
    </div>
  );
});

export default ImageBlock;
