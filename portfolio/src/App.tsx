import { useState } from "react";

import SideNav from "./components/SideNav";
import Home from "./components/Home";
import ImageTrack from "./components/ImageTrack";

function App() {
  return (
    <>
      <head></head>
      <main className="bg-hero-pattern w-full h-screen bg-repeat px-10">
        <section className="min-h-screen">
          <SideNav />
          <div className="card overflow-hidden h-screen">
            <ImageTrack />
            <footer className="bg-footer-texture py-4"></footer>
            <Home />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
