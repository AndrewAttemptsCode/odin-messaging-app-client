import { useContext } from "react";
import styled from "styled-components";
import { ChatContext } from "../contexts/ChatContext";

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
`

const ChatConvo = () => {
  const { chatMessages } = useContext(ChatContext);

  return (
    <Container>
      {chatMessages && chatMessages.map((message) => (
        <p key={message.id}>{message.sender.username} - {message.createdAt} - {message.text}</p>
      ))}
    </Container>
  );
};

export default ChatConvo;