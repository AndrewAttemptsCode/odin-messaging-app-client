import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <ChatPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
]);

export default routes;
