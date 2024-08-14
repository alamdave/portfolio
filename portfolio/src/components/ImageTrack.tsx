import React, { useEffect, useRef, useState } from "react";

interface ImageTrackProps {
  images: string[];
  imageWidth?: number;
  gapWidth?: number;
  scalingFactor?: number;
}

const ImageTrack: React.FC<ImageTrackProps> = ({
  images,
  imageWidth = 40,
  gapWidth = 4,
  scalingFactor = 0.3,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = (imageWidth + gapWidth) * images.length - gapWidth;
    track.style.width = `${totalWidth}vmin`;

    const handleOnDown = (e: MouseEvent | TouchEvent) => {
      const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
      track.dataset.mouseDownAt = clientX.toString();
    };

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = percentage.toString();
    };

    const handleOnMove = (e: MouseEvent | TouchEvent | WheelEvent) => {
      let nextPercentage: number;
      if (e instanceof WheelEvent) {
        const deltaY = e.deltaY;
        nextPercentage = percentage + (deltaY / window.innerWidth) * -100;

        if (nextPercentage === 0 || nextPercentage === -100) {
          window.removeEventListener("wheel", handleOnMove as EventListener);
          window.scrollBy(0, deltaY);
          setTimeout(() => {
            window.addEventListener("wheel", handleOnMove as EventListener, {
              passive: false,
            });
          }, 1200);
        }
      } else {
        if (track.dataset.mouseDownAt === "0") return;

        const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
        const mouseDelta =
          parseFloat(track.dataset.mouseDownAt || "0") - clientX;
        const maxDelta = window.outerWidth / 2;
        const percentage = (mouseDelta / maxDelta) * -100;
        nextPercentage =
          parseFloat(track.dataset.prevPercentage || "0") +
          percentage * scalingFactor;
      }
      //chnage the negative number to controll how far back you can go.
      nextPercentage = Math.max(Math.min(nextPercentage, 0), -90);
      setPercentage(nextPercentage);

      track.animate(
        { transform: `translate(${nextPercentage}%, -50%)` },
        { duration: 1500, fill: "forwards" }
      );

      const images = track.getElementsByClassName("image");
      for (const image of images) {
        (image as HTMLElement).animate(
          { objectPosition: `${100 + nextPercentage}% center` },
          { duration: 1500, fill: "forwards" }
        );
      }
    };

    const handleMouseDown = (e: MouseEvent) => handleOnDown(e);
    const handleTouchStart = (e: TouchEvent) => handleOnDown(e);
    const handleMouseUp = () => handleOnUp();
    const handleTouchEnd = () => handleOnUp();
    const handleMouseMove = (e: MouseEvent) => handleOnMove(e);
    const handleTouchMove = (e: TouchEvent) => handleOnMove(e);
    const handleWheel = (e: WheelEvent) => handleOnMove(e);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [images, imageWidth, gapWidth, scalingFactor, percentage]);

  return (
    <div
      ref={trackRef}
      id="ImageTrack"
      className={`flex gap-[4vmin] absolute left-[10%] top-[40%] transform translate-y-[-50%] select-none`}
      data-mouse-down-at="0"
      data-prev-percentage="0"
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`image ${index + 1}`}
          className={`image w-[40vmin] h-[56vmin] object-cover object-center`}
          draggable="false"
          onError={(e) => {
            console.error("Image failed to load", e);
          }}
        />
      ))}
    </div>
  );
};

export default ImageTrack;
