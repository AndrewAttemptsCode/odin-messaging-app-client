import styled from "styled-components";
import UserAvatar from "./UserAvatar";
import formatDate from "../utils/formatDate";
import formatTime from "../utils/formatTime";
import capitalize from "../utils/capitalize";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1rem;
  padding: 1rem;
`

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const InfoContainer = styled.div`
  display: flex;
  gap: 10px;

  p:first-of-type {
    font-weight: bold;
    color: ${({$usernameColor}) => $usernameColor};
  }
`

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MessageContainer = styled.div`
  display: flex;
  white-space: pre-wrap;
`

const ChatConvoMessage = ({ username, createdAt, message, avatarColor, usernameColor }) => {
  return (
    <Container>
      <AvatarWrapper>
        <UserAvatar
          bg={avatarColor}
          username={username}
          size={40}
        />
      </AvatarWrapper>
      <BodyContainer>
        <InfoContainer $usernameColor={usernameColor || "#333333"}>
          <p>{capitalize(username)}</p>
          <p>{formatDate(createdAt)}</p>
          <p>{formatTime(createdAt)}</p>
        </InfoContainer>
        <MessageContainer>
          <p>{message}</p>
        </MessageContainer>
      </BodyContainer>
    </Container>
  );
};

export default ChatConvoMessage;