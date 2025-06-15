import { Send } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../contexts/ChatContext";

const Form = styled.form`
  background-color: red;
  padding: 1rem;
  
  textarea {
    width: 100%;
    height: 8ch;
    resize: none;
    border-radius: 10px;
    padding: 0.5rem 4rem 0.5rem 0.5rem;
    scrollbar-width: none;
  }

  button[type="submit"] {
    position: absolute;
    top: 0;
    right: 0.5rem;
    transform: translateY(30%);
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
  }
`

const TextAreaWrapper = styled.div`
  position: relative;
  width: 100%;
`


const ChatMessage = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { activeChat } = useContext(ChatContext);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [activeChat]);

  const handleSubmit = async (event) => {
    event?.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/chats/${activeChat.chatId}/messages`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(
          {
            text,
            senderId: activeChat.senderId,
          }
        ),
      })

      const data = await response.json();
      console.log(data);
      setText("");
      textareaRef.current?.focus();

    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (text.trim()) {
        event.preventDefault();
        handleSubmit();
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TextAreaWrapper>
        <textarea ref={textareaRef} onKeyDown={handleKeyDown} name="text" id="text" placeholder="Send a message..." value={text} onChange={(event) => setText(event.target.value)}></textarea>
        <button type="submit" disabled={loading}><Send /></button>
      </TextAreaWrapper>
    </Form>
  );
};

export default ChatMessage;