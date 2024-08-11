import React, { useEffect, useRef } from "react";

const ImageTrack: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1550007345-dcdff81aa558?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1549999740-0ae979bd6523?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1549928619-dec5c56266eb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1550353175-a3611868086b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1551482850-d649f078ed01?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  let isAnimating = false;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animateTrack = (nextPercentage: number) => {
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(() => {
          track.animate(
            { transform: `translate(${nextPercentage}%, -50%)` },
            { duration: 1200, fill: "forwards" }
          );

          const images = track.getElementsByClassName("image");
          for (const image of images) {
            (image as HTMLElement).animate(
              { objectPosition: `${100 + nextPercentage}% center` },
              { duration: 1200, fill: "forwards" }
            );
          }
          isAnimating = false;
        });
      }
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      track.dataset.mouseDownAt = `${clientX}`;
    };

    const handleMouseUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage || "0";
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (track.dataset.mouseDownAt === "0") return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const mouseDelta = parseFloat(track.dataset.mouseDownAt || "0") - clientX;
      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;
      const unweightedNextPercentage =
        parseFloat(track.dataset.prevPercentage || "0") + percentage;
      let nextPercentage = Math.max(
        Math.min(unweightedNextPercentage, 0),
        -100
      );

      track.dataset.percentage = `${nextPercentage}`;
      animateTrack(nextPercentage);
    };

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      const deltaY = e.deltaY;
      const prevPercentage = parseFloat(track.dataset.percentage || "0");

      let nextPercentage =
        prevPercentage + (deltaY / window.innerHeight) * -100;
      nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

      track.dataset.percentage = `${nextPercentage}`;
      animateTrack(nextPercentage);

      // Allow normal scrolling if the track is at either end
      if (nextPercentage === 0 || nextPercentage === -100) {
        window.removeEventListener("wheel", handleScroll);
        window.scrollBy(0, deltaY);
        setTimeout(() => {
          window.addEventListener("wheel", handleScroll, { passive: false });
        }, 1200);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("wheel", handleScroll);
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <div
      ref={trackRef}
      id="ImageTrack"
      className="flex gap-[2vmin] absolute left-[10%] top-[40%] translate-x-[0%] translate-y-[-50%]"
      data-mouse-down-at="0"
      data-prev-percentage="0"
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`image ${index + 1}`}
          className="image w-[32vmin] h-[46vmin] object-cover object-left-[50%] object-right-[50%]"
          draggable="false"
        />
      ))}
    </div>
  );
};

export default ImageTrack;
