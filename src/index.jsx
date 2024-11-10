import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./screens/ErrorPage.jsx";
import Authentication, {
  AuthenticationMode,
} from "./screens/Authentication.jsx";
import ProtectedRoute from "./componets/protectedRoute.jsx";
import UserProvider from "./context/userProvider.jsx";
import Home from "./screens/Home.jsx";
const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <Authentication authenticationMode={AuthenticationMode.Login} />,
  },
  {
    path: "/signup",
    element: (
      <Authentication authenticationMode={AuthenticationMode.Register} />
    ),
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
