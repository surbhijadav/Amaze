import { createBrowserRouter } from "react-router-dom";
import { FullLayout } from "../components/fullLayout";
import { Home } from "../pages/Home";
import { Contact } from "../pages/Contact";
import { About } from "../pages/About";
import { LogIn } from "../pages/LogIn";
import { Register } from "../pages/Register";
import { Countries } from "../pages/Countries";
import { Facts } from "../pages/Facts";
import { Regions } from "../pages/Regions";
import { ProtectedRoute } from "./protectedRoute";
import { PublicLayout } from "../components/publicLayout";
import { RegionDetail } from "../pages/regionDetails";

// Define your routes here
export const AppRoutes = createBrowserRouter([
  // Main layout for most pages
  {
    path: "/",
    element: <FullLayout />,
    errorElement: <div>Oops! Something went wrong. <a href="/">Go home</a></div>,
    children: [
      {
        index: true,
        element:<Home />,
        //  <ProtectedRoute></ProtectedRoute>,
      },
      {
        path: "about",
        element:<About />,
        // <ProtectedRoute></ProtectedRoute> ,
      },
      {
        path: "contact",
        element: <Contact />,
        // <ProtectedRoute></ProtectedRoute>,
      },
      {
        path: "countries",
        element: <Countries />,
        // <ProtectedRoute></ProtectedRoute>,
      },
      {
        path: "facts",
        element:<Facts />,
        //  <ProtectedRoute></ProtectedRoute>,
      },
      {
        path: "regions",  
        element:<Regions />,
        //  <ProtectedRoute></ProtectedRoute>,
      },
      {
        path: "regions/:regionName",  
        element:<RegionDetail />,
        //  <ProtectedRoute></ProtectedRoute>,
      },
    ],
  },
  // Auth pages – No layout
  {
    path: "/login",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LogIn />,
      },
    ],
  },
  {
    path: "/register",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
]);