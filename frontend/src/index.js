import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddCompany } from "./pages/AddCompany";
import { Toaster } from "react-hot-toast";

import { CompanyDetails } from "./pages/CompanyDetails";

import { Theme } from "@radix-ui/themes";
import { NavbarWrapper } from "./components/NavBarWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/add-client",
        element: <AddCompany />,
      },
      {
        path: "/client-details/:clientId",
        element: <CompanyDetails />,
      },
      {
        path: "*",
        element: <div className="text-center my-5 text-3xl">Not Found</div>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Theme>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router}></RouterProvider>
    </Theme>
  </React.StrictMode>
);

reportWebVitals();
