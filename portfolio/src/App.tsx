import { useState } from "react";

import SideNav from "./components/SideNav";
import Home from "./components/Home";
import ImageTrack from "./components/ImageTrack";

function App() {
  return (
    <>
      <div className="card overflow-hidden h-screen">
        <div className="bg-hero-pattern w-full h-screen bg-repeat ">
          <ImageTrack />
        </div>
        <footer className="bg-footer-texture py-4"></footer>
        <SideNav />
        <Home />
      </div>
    </>
  );
}

export default App;
