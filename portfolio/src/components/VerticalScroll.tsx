import React, { useEffect, useRef, useState } from "react";

interface WithVerticalScrollProps {
  length: number;
}

const withVerticalScroll = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P & WithVerticalScrollProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const handleScroll = (event: WheelEvent) => {
        if (containerRef.current) {
          event.preventDefault();
          const deltaY = event.deltaY;

          if (deltaY > 0 && currentIndex < props.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else if (deltaY < 0 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
          } else if (deltaY > 0 && currentIndex === props.length - 1) {
            window.scrollBy(0, deltaY);
          } else if (deltaY < 0 && currentIndex === 0) {
            window.scrollBy(0, deltaY);
          }
        }
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener("wheel", handleScroll, { passive: false });
      }

      return () => {
        if (container) {
          container.removeEventListener("wheel", handleScroll);
        }
      };
    }, [currentIndex, props.length]);

    return (
      <div ref={containerRef} className="relative h-screen w-full">
        <Component {...(props as P)} currentIndex={currentIndex} />
      </div>
    );
  };
};

export default withVerticalScroll;
