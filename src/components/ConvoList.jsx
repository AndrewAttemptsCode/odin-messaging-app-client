import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { AuthContext } from "../contexts/AuthContext";
import UserAvatar from "./UserAvatar";
import capitalize from "../utils/capitalize";
import styled from "styled-components";

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

const ConvoList = () => {
  const { activeConvos, connectChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const handleOnClick = (receiverId) => {
    connectChat(user.id, receiverId);
  }

  if (activeConvos.length === 0) {
    return <p>No chats found</p>
  }

  return (
    <Container>
    {activeConvos && activeConvos.map((convo) => {
      const otherUser = convo.user1Id === user.id ? convo.user2 : convo.user1;
      return (
        <UserContainer key={convo.id} onClick={() => handleOnClick(otherUser.id)}>
          <UserAvatar bg={otherUser.avatarColor} size={40} username={otherUser.username}/>  
          {capitalize(otherUser.username)}
        </UserContainer>
      );
    })}
    </Container>
  );
};

export default ConvoList;