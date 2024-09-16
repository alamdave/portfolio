import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen py-12">
        <main className="">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
