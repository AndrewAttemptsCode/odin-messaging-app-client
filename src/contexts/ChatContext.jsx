import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [activeChat, setActiveChat] = useState({ senderId: null, receiverId: null, chatId: null });
  const [chatMessages, setChatMessages] = useState();
  const [activeConvos, setActiveConvos] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchUsers = useCallback(async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
        method: "get",
      });

        const data = await response.json();
        setChatUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    }, []);

  const connectChat = async (senderId, receiverId) => {
    setActiveChat({ senderId, receiverId });
    console.log("Active Chat:", activeChat);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/chats/between/${senderId}/${receiverId}`, {
        method: "get",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      const data = await response.json();
      setChatMessages(data.messages);
      setActiveChat((prev) => (
        {
          ...prev,
          chatId: data.id,
        }
      ))
      fetchActiveConvos();
      console.log(data);

    } catch(err) {
      console.error("Error fetching chat", err);
    }
  }

  const fetchActiveConvos = useCallback(async() => {
    if (!user?.id) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/chats/${user.id}`, {
        method: "get",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      console.log("fetch active chats:", data);
      setActiveConvos(data);
    } catch (error) {
      console.error("Error fetching active convos:", error);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchActiveConvos();
    fetchUsers();
  }, [fetchActiveConvos, fetchUsers]);
  
  const values = {
    connectChat,
    chatMessages,
    activeChat,
    activeConvos,
    chatUsers,
    fetchUsers,
  }

  return (
    <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
  );
};