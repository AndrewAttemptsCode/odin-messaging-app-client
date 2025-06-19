import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ChatContext } from "../contexts/ChatContext";
import ChatConvoMessage from "./ChatConvoMessage";

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
        <ChatConvoMessage 
          key={message.id}
          username={message.sender.username}
          createdAt={message.createdAt}
          message={message.text}
          avatarColor={message.sender.avatarColor}
          usernameColor={message.sender.usernameColor}
        />
      ))}
    </Container>
  );
};

export default ChatConvo;