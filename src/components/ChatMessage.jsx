import { Send } from "lucide-react";
import styled from "styled-components";

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
  return (
    <Form action="" method="post">
      <TextAreaWrapper>
        <textarea name="text" id="text" placeholder="Send a message..."></textarea>
        <button type="submit"><Send /></button>
      </TextAreaWrapper>
    </Form>
  );
};

export default ChatMessage;