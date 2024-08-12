import React, { useEffect, useRef } from "react";

const ImageTrack: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1550007345-dcdff81aa558?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1549999740-0ae979bd6523?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1549928619-dec5c56266eb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1550353175-a3611868086b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1551482850-d649f078ed01?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1695221087406-257eca10a2e7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1723145886817-1a2ee70a251b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1723083661302-ca5b3459e278?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleOnDown = (e: MouseEvent | TouchEvent) => {
      const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
      track.dataset.mouseDownAt = clientX.toString();
    };

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage || "0";
    };

    const handleOnMove = (e: MouseEvent | TouchEvent | WheelEvent) => {
      let nextPercentage: number;
      if (e instanceof WheelEvent) {
        const deltaY = e.deltaY;
        const prevPercentage = parseFloat(track.dataset.percentage || "0");

        nextPercentage = prevPercentage + (deltaY / window.innerWidth) * -100;

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
          parseFloat(track.dataset.prevPercentage || "0") + percentage;
      }

      nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

      track.dataset.percentage = String(nextPercentage);

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
    };

    const handleMouseDown = (e: MouseEvent) => handleOnDown(e);
    const handleTouchStart = (e: TouchEvent) => handleOnDown(e);

    const handleMouseUp = () => handleOnUp();
    const handleTouchEnd = () => handleOnUp();

    const handleMouseMove = (e: MouseEvent) => handleOnMove(e);
    const handleTouchMove = (e: TouchEvent) => handleOnMove(e);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    window.addEventListener("wheel", handleOnMove as EventListener, {
      passive: false,
    });

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);

      window.removeEventListener("wheel", handleOnMove as EventListener);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      id="ImageTrack"
      className="flex gap-[2vmin] absolute left-[10%] top-[40%] transform translate-y-[-50%] select-none"
      data-mouse-down-at="0"
      data-prev-percentage="0"
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`image ${index + 1}`}
          className="image w-[32vmin] h-[46vmin] object-cover object-center"
          draggable="false"
        />
      ))}
    </div>
  );
};

export default ImageTrack;
