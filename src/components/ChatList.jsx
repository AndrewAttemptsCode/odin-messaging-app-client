import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ChatList = () => {
  const [chatUsers, setChatUsers] = useState([{ id: 0, username: "" }]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
        method: "get",
      });

        const data = await response.json();
        setChatUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
      
    fetchUsers();
  }, []);

  const handleOnClick = (receiverId) => {
    console.log(`Sender Id: ${user.id}, Receiver Id: ${receiverId}`);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {chatUsers
      .filter(chatUser => chatUser.id !== user.id)
      .map(chatUser => (
        <div key={chatUser.id} onClick={() => handleOnClick(chatUser.id)}>{chatUser.username}</div>
      ))}
    </>
  )
}

export default ChatList;