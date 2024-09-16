import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

interface ImageTrackProps {
  images: string[];
  imageWidth?: number;
  gapWidth?: number;
  scalingFactor?: number;
  duration?: number;
  maxScroll?: number;
}

const ImageTrack: React.FC<ImageTrackProps> = ({
  images,
  imageWidth = 40,
  gapWidth = 4,
  scalingFactor = 0.3,
  duration = 600,
  maxScroll = 85,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);

  const totalWidth = useMemo(() => {
    return (imageWidth + gapWidth) * images.length - gapWidth;
  }, [imageWidth, gapWidth, images.length]);

  const handleAnimation = useCallback(
    (nextPercentage: number) => {
      const boundedPercentage = Math.max(
        Math.min(nextPercentage, 0),
        -maxScroll
      );
      setPercentage(boundedPercentage);

      const track = trackRef.current;
      if (!track) return;

      const easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";

      track.style.transition = `transform ${duration}ms ${easing}`;
      track.style.transform = `translate(${boundedPercentage}%)`;

      const images = track.getElementsByClassName("image");
      for (const image of images) {
        (
          image as HTMLElement
        ).style.transition = `object-position ${duration}ms ${easing}`;
        (image as HTMLElement).style.objectPosition = `${
          100 + boundedPercentage
        }% center`;
      }
    },
    [duration, maxScroll]
  );

  const handleOnDown = useCallback((clientX: number) => {
    setMouseDownAt(clientX);
  }, []);

  const handleOnUp = useCallback(() => {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  }, [percentage]);

  const handleOnMove = useCallback(
    (clientX: number) => {
      if (mouseDownAt === 0) return;

      const mouseDelta = mouseDownAt - clientX;
      const maxDelta = window.outerWidth / 2;
      const percentageDelta = (mouseDelta / maxDelta) * -100;
      const nextPercentage = prevPercentage + percentageDelta * scalingFactor;

      handleAnimation(nextPercentage);
    },
    [mouseDownAt, prevPercentage, scalingFactor, handleAnimation]
  );

  const handleWheel = useCallback(
    (deltaY: number) => {
      const nextPercentage = percentage + (deltaY / window.innerWidth) * -100;
      handleAnimation(nextPercentage);
    },
    [percentage, handleAnimation]
  );

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!track || !container) return;

    track.style.width = `${totalWidth}vmin`;

    const handleMouseDown = (e: MouseEvent) => handleOnDown(e.clientX);
    const handleTouchStart = (e: TouchEvent) =>
      handleOnDown(e.touches[0].clientX);
    const handleMouseUp = () => handleOnUp();
    const handleTouchEnd = () => handleOnUp();
    const handleMouseMove = (e: MouseEvent) => handleOnMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) =>
      handleOnMove(e.touches[0].clientX);
    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      handleWheel(e.deltaY);
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("wheel", handleWheelEvent, { passive: false });

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("wheel", handleWheelEvent);
    };
  }, [totalWidth, handleOnDown, handleOnUp, handleOnMove, handleWheel]);

  return (
    <div ref={containerRef} className="relative p-4">
      <div
        ref={trackRef}
        className="flex relative left-[30%] top-10 transform translate-y-0 select-none"
        style={{ gap: `${gapWidth}vmin` }}
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
              console.error(`Image ${index + 1} failed to load`, e);
              (e.target as HTMLImageElement).src = "path/to/fallback/image.jpg";
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageTrack;
