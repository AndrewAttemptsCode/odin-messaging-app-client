import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

export default routes;
