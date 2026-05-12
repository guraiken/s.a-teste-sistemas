import { createBrowserRouter } from "react-router";
import App from "../App";
import { Login } from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <div>Dashboard - Em desenvolvimento</div>, // Substituir pelo componente Dashboard real
      },
    ],
  },
]);
