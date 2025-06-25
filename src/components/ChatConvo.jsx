import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ChatContext } from "../contexts/ChatContext";
import ChatConvoMessage from "./ChatConvoMessage";
import { Send } from "lucide-react";

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
`

const MessageWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h2 {
    color: #191970;
  }
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
      {chatMessages && chatMessages.length === 0 && (
        <MessageWrapper>
          <Send size={150} />
          <h2>Be the first to send a message!</h2>
        </MessageWrapper>
      )}

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