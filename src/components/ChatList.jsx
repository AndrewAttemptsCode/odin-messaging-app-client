import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import UserAvatar from "./UserAvatar";
import styled from "styled-components";
import capitalize from "../utils/capitalize";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0.5rem;
`

const ChatList = () => {
  const [chatUsers, setChatUsers] = useState([{ id: 0, username: "", avatarColor: "", usernameColor: "" }]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { connectChat } = useContext(ChatContext);

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
    connectChat(user.id, receiverId);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      {chatUsers
      .filter(chatUser => chatUser.id !== user.id)
      .map(chatUser => (
        <UserContainer key={chatUser.id} onClick={() => handleOnClick(chatUser.id)}>
          <UserAvatar bg={chatUser.avatarColor} size={40} username={chatUser.username} />
          {capitalize(chatUser.username)}
        </UserContainer>
      ))}
    </Container>
  )
}

export default ChatList;