import React from "react";
import MainLayout from "../layouts/MainLayout";
import ImageTrack from "../components/ImageTrack";

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

const Home: React.FC = () => {
  return (
    <MainLayout>
      {/* Main content for the Home page */}
      <section className="container mx-auto p-4">
        <h1 className="font-titlef text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-10xl mb-[]">
          FULL-STACK
        </h1>
        <h1 className="font-titlef text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-10xl mb-10">
          DEVELOPER
        </h1>
        <h1 className="font-titlef text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-10xl mb-10">
          DEVELOPER
        </h1>
        <ImageTrack images={images} />
        {/* Other content */}
      </section>
    </MainLayout>
  );
};

export default Home;
