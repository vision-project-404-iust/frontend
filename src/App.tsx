// src/App.tsx (or your main router file)

import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Layout } from "./components/layout/Layout";
import { DashboardPage } from "./components/DashboardPage";
import { StudentsPage } from "./components/StudentPage";
import { ClassesPage } from "./components/ClassesPage";

const router = createBrowserRouter([
  {
    // The root path uses the Layout component
    path: "/",
    element: <Layout />,
    // Child routes are rendered inside the Layout's <Outlet>
    children: [
      {
        // The index route redirects to the default page
        index: true,
        element: (
          <Navigate
            to="/dashboard"
            replace
          />
        ),
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "classes",
        element: <ClassesPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
