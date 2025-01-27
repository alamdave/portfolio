import React from "react";

const Bio: React.FC = () => {
  return (
    <section className="container mx-auto px-4">
      <h1 className="font-bodyf text-[8vw] sm:text-[8vw] md:text-[10vw] lg:text-[8vw] leading-none -mb-3 truncate text-customWhite text-left">
        Hello World !
      </h1>
      <p className="font-bodyf text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[2vw] text-customWhite text-left leading-none pt-[3vw]">
        I am a Full Stack Developer with a passion for solving problems and
        creating beautiful, interactive websites. I focus on crafting engaging
        user experiences and innovative solutions.
      </p>
      <p className="font-bodyf text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[2vw] text-customWhite text-left leading-none pt-[2vw]">
        With a computer science degree from the University of Nottingham 🎓, I
        have nurtured a strong interest in development from an early age. My
        journey has led me to work on various projects, including freelance and
        startup environments. Notably, I was a core developer at Coding with
        CodeX, a tech education startup, where I contributed to developing a web
        application.
      </p>
      <p className="font-bodyf text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[2vw] text-customWhite text-left leading-none pt-[2vw]">
        My expertise includes technologies such as React, node.js, and Tailwind
        CSS. Currently, I'm excited to be working on a project using Next.js and
        Tailwind CSS, and I look forward to exploring new challenges that will
        help me grow further in my career as a Full Stack Developer.
      </p>
    </section>
  );
};

export default Bio;
