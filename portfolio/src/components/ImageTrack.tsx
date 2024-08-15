import React, { useEffect, useRef, useState } from "react";

interface ImageTrackProps {
  images: string[];
  imageWidth?: number;
  gapWidth?: number;
  scalingFactor?: number;
  duration?: number;
}

const ImageTrack: React.FC<ImageTrackProps> = ({
  images,
  imageWidth = 40,
  gapWidth = 4,
  scalingFactor = 0.3,
  duration = 600,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!track || !container) return;

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
          }, duration);
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
      nextPercentage = Math.max(Math.min(nextPercentage, 0), -85);
      setPercentage(nextPercentage);

      const easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";

      track.animate(
        { transform: `translate(${nextPercentage}%)` },
        { duration: duration, fill: "forwards", easing: easing }
      );

      const images = track.getElementsByClassName("image");
      for (const image of images) {
        (image as HTMLElement).animate(
          { objectPosition: `${100 + nextPercentage}% center` },
          { duration: duration, fill: "forwards", easing: easing }
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

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [images, imageWidth, gapWidth, scalingFactor, percentage, duration]);

  return (
    <div ref={containerRef} className="relative p">
      <div
        ref={trackRef}
        id="ImageTrack"
        className={`flex gap-[4vmin] relative left-[30%] top-10 transform translate-y-0 select-none`}
        style={{ gap: `${gapWidth}vmin` }}
        data-mouse-down-at="0"
        data-prev-percentage="0"
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`image ${index + 1}`}
            className="image h-[56vmin] object-cover object-center"
            style={{ width: `${imageWidth}vmin` }}
            draggable="false"
            onError={(e) => {
              console.error("Image failed to load", e);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageTrack;
