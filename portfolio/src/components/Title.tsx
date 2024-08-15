import React from "react";

const Title: React.FunctionComponent = () => {
  return (
    <section className="container mx-auto px-4">
      <h1 className="font-titlef text-[8vw] sm:text-[8vw] md:text-[10vw] lg:text-[8vw] leading-none -mb-3 truncate pt-[200px] text-customWhite">
        ALAMDAVE GILL
      </h1>
      <h1 className="font-titlef text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] leading-none -mb-3 text-customWhite">
        FULL-STACK
      </h1>
      <h1 className="font-titlef text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] leading-none -mb-3 text-customWhite">
        DEVELOPER
      </h1>
      <h1 className="font-titlef text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] leading-none text-customWhite">
        BASED IN LONDON.
      </h1>
    </section>
  );
};

export default Title;
