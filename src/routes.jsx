import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from './pages/Login/index.jsx'
import Feed from './pages/Feed/index.jsx'
import JoinUs from "./pages/JoinUs/index.jsx";

const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <JoinUs/>,
    },
    {
      path: "/",
      element: <Feed/>,
    },
  ]);

export function Routes() {
    return (
        <RouterProvider router={router} />
    )
}