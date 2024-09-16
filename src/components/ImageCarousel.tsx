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
  const [dragPercent, setDragPercent] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const easing = "cubic-bezier(0.4, 0.0, 0.2, 1)";

  const animateTrack = (nextPercentage: number) => {
    const track = trackRef.current;
    if (track) {
      // Animate track translation
      track.animate(
        { transform: `translate(${nextPercentage}%)` },
        { duration: duration, fill: "forwards", easing: easing }
      );

      // Animate images' object position
      const images = track.getElementsByClassName("image");
      for (const image of Array.from(images)) {
        (image as HTMLElement).animate(
          { objectPosition: `${100 + nextPercentage}% center` },
          { duration: duration, fill: "forwards", easing: easing }
        );
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && dragStart !== null) {
      const deltaX = e.clientX - dragStart;
      const nextPercentage = dragPercent + deltaX * scalingFactor;
      setDragPercent(nextPercentage);
      animateTrack(nextPercentage);
      setDragStart(e.clientX);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    const nextPercentage = dragPercent - e.deltaY * scalingFactor;
    setDragPercent(nextPercentage);
    animateTrack(nextPercentage);
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mouseleave", handleMouseUp);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mouseleave", handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const imageStyle = {
    width: `${imageWidth}vmin`,
    marginRight: `${gapWidth}vmin`,
    height: "56vmin",
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    >
      <div ref={trackRef} className="flex">
        {images.map((src, index) => (
          <button
            key={index}
            className="image transform transition-transform duration-200 hover:scale-110 focus:outline-none"
            style={imageStyle}
            onClick={() => console.log(`Image ${index + 1} clicked`)}
          >
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
              onError={() => console.error(`Failed to load image ${src}`)}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageTrack;
