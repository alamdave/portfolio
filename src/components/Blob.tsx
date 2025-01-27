import React, { useEffect, useRef } from "react";

interface BlobBackgroundProps {
  className?: string;
  blendMode: string;
  circleSize: string;
}

const Blob: React.FC<BlobBackgroundProps> = ({
  className,
  blendMode,
  circleSize,
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const interactive = interactiveRef.current;
    if (!interactive) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interactive.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    };

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`gradient-bg absolute inset-0 overflow-hidden ${className} `}
    >
      <img
        src="/noiseFilter.svg"
        alt=""
        className="absolute inset-0 w-full h-full z-10 opacity-30 mix-blend-soft-light"
      />
      <img src="/blobFilter.svg" alt="" className="" />
      <div
        className="gradients-container absolute inset-0"
        style={{ filter: "url(#goo) blur(50px)" }}
      >
        <div
          className={`g1
        absolute 
        rounded-full
        bg-gradient-radial from-purple-500/80 to-transparent
        mix-blend-${blendMode}

        w-[${circleSize}] h-[${circleSize}]
        top-[calc(100%-${circleSize})/2] left-[calc(100%-${circleSize})/2]
        
        origin-center
        animate-moveVertical
        opacity-100
      `}
        />

        <div
          className={`g2 
        absolute 
        rounded-full
        bg-gradient-radial from-blue-500/80 to-transparent
        mix-blend-${blendMode}

        w-[${circleSize}] h-[${circleSize}]
        top-[calc(50%-${circleSize})/2] left-[calc(50%-${circleSize})/2]
        
        origin-[calc(50%-400px)]
        animate-moveInCircle
        opacity-100
      `}
        />

        <div
          className={`g3
        absolute 
        rounded-full
        bg-gradient-radial from-teal-500/80 to-transparent
        mix-blend-${blendMode}

        w-[${circleSize}] h-[${circleSize}]
        top-[50%-${circleSize}+200px] left-[calc(50%-${circleSize}-500px)]
        
        origin-[calc(50%-400px)]
        animate-moveInCircle 40s linear infinite
        opacity-100
      `}
        />

        <div
          className={`g4
        absolute 
        rounded-full
        bg-gradient-radial from-red-600/80 to-transparent
        mix-blend-${blendMode}

        w-[${circleSize}] h-[${circleSize}]
        top-[calc(50%-${circleSize})/2] left-[calc(50%-${circleSize})/2]
        
        origin-[calc(50%-200px)]
        animate-moveHorizontal 40s ease infinite
        opacity-70
      `}
        />

        <div
          className={`g5
        absolute 
        rounded-full
        bg-gradient-radial from-emerald-900/80 to-transparent
        mix-blend-${blendMode}

        w-[calc(${circleSize}*2)] h-[calc(${circleSize}*2)]
        top-[calc(50%-${circleSize})] left-[calc(50%-${circleSize})]
        
        origin-[calc(50%-800px)] calc[50%+200px)]
        animate-moveInCircle 20s ease infinite
        opacity-100
      `}
        />

        <div
          className={`g5
        absolute 
        rounded-full
        bg-gradient-radial from-blue-500/80 to-transparent
        mix-blend-${blendMode}

        w-[calc(${circleSize}*2)] h-[calc(${circleSize}*2)]
        top-[calc(50%-${circleSize})] left-[calc(50%-${circleSize})]
        
        origin-[calc(50%-800px)] calc[50%+200px)]
        animate-moveInCircle 20s ease infinite
        opacity-100
      `}
        />

        <div
          ref={interactiveRef}
          className="interactive absolute w-screen h-full -top-1/2 -left-1/2 bg-gradient-radial from-green-500/60 to-transparent to-50% mix-blend-hard-light opacity-70"
        ></div>
      </div>
    </div>
  );
};

export default Blob;
