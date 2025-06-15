import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState({ senderId: null, receiverId: null, chatId: null });
  const [chatMessages, setChatMessages] = useState();

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
      console.log(data);

    } catch(err) {
      console.error("Error fetching chat", err);
    }
  }
  
  const values = {
    connectChat,
    chatMessages,
    activeChat,
  }

  return (
    <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
  );
};