import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState({ sender: null, receiver: null });
  const [chatMessages, setChatMessages] = useState();

  const connectChat = async (senderId, receiverId) => {
    setActiveChat({ sender: senderId, receiver: receiverId });
    console.log("Active Chat:", activeChat);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/chat/${senderId}/${receiverId}`, {
        method: "get",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })

      const data = await response.json();
      setChatMessages(data.messages);
      console.log(data);

    } catch(err) {
      console.error("Error fetching chat", err);
    }
  }
  
  const values = {
    connectChat,
    chatMessages,
  }

  return (
    <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
  );
};