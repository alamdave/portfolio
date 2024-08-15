import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen py-12">
      <header />
      <div className="">
        {/* Main Content */}
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
