import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";

export const NavbarWrapper = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
