import "./Layout.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MobileBottomHeader from "../components/Header/MobileBottomHeader/MobileBottomHeader";
import MainSidebar from "../components/MainSidebar/MainSidebar";

export default function MainLayout() {
  const [mainSidebar, setMainSidebar] = useState(false);

  return (
    <>
      <Header setMainSidebar={setMainSidebar} mainSidebar={mainSidebar} />
      <div className="relative">
        <aside
          className={`main_sidebar  ${mainSidebar && "main_sidebar_remove"}`}
        >
          <MainSidebar />
        </aside>
        <div className="main_content">
          <div className="min-h-[88vh]">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
      <MobileBottomHeader />
    </>
  );
}
