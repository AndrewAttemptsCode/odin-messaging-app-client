import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ChatContext } from "../contexts/ChatContext";

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
`

const ChatConvo = () => {
  const { chatMessages } = useContext(ChatContext);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <Container ref={chatRef}>
      {chatMessages && chatMessages.map((message) => (
        <p key={message.id}>{message.sender.username} - {message.createdAt} - {message.text}</p>
      ))}
    </Container>
  );
};

export default ChatConvo;