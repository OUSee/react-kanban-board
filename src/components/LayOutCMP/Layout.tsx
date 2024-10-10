import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
