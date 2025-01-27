import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlobBackground from "../components/Blob";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow relative overflow-hidden">
        <BlobBackground
          className="absolute inset-0 z-0"
          circleSize="80%"
          blendMode="hard-light"
        />
        <Header className="relative z-10" />
        <main className="relative z-10 py-6 md:py-12">{children}</main>
      </div>
      <Footer className="relative z-10" />
    </div>
  );
};

export default MainLayout;
