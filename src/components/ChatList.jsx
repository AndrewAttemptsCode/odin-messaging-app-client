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

const LoadingContainer = styled.p`
  text-align: center;
`

const ChatList = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { connectChat, chatUsers, fetchUsers } = useContext(ChatContext);

  useEffect(() => {
    const updateUsersList = async () => {
      try {
        setLoading(true);
        await fetchUsers();
      } catch (err) {
        console.error("Failed to update users list", err);
      } finally {
        setLoading(false);
      }
    }
    updateUsersList();
  }, [fetchUsers]);

  const handleOnClick = (receiverId) => {
    connectChat(user.id, receiverId);
  }

  if (loading) return <LoadingContainer>Loading users...</LoadingContainer>;

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