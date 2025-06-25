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
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #B0C4DE;
  }
`

const ChatList = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { connectChat, chatUsers, fetchUsers } = useContext(ChatContext);

  useEffect(() => {
    const updateUsersList = async () => {
      try {
        console.log("fetching fresh user list");
        setLoading(true);
        await fetchUsers();
      } catch (err) {
        console.error("Failed to update users list", err);
      } finally {
        console.log("Done fetching new user list");
        setLoading(false);
      }
    }
    updateUsersList();
  }, [fetchUsers]);

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