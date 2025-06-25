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
  align-items: center;
  gap: 10px;

  p:first-of-type {
    font-weight: bold;
    color: ${({$usernameColor}) => $usernameColor};
  }

  p:not(:first-of-type) {
    color: #708090;
    font-size: 0.8rem;
  }
`

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MessageContainer = styled.div`
  display: flex;
  white-space: pre-wrap;
  color: #333333;

  @media (max-width: 424px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }
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