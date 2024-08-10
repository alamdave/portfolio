import { useState } from "react";
import SideNav from "./components/SideNav";
import Home from "./components/Home";

function App() {
  return (
    <>
      <div className="card">
        <SideNav />
        <Home />
      </div>
    </>
  );
}

export default App;
