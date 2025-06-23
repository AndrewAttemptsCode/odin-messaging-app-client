import styled from "styled-components";
import ChatConvo from "../components/ChatConvo";
import ChatMessage from "../components/ChatMessage";
import ChatUserList from "../components/ChatUserList";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ActiveConvoList from "../components/ActiveConvoList";
import { ChatContext } from "../contexts/ChatContext";
import { MessageSquareText } from "lucide-react";

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas: "aside main";
  border: 2px solid red;

  aside {
    grid-area: aside;
    border: 2px solid blue;
    overflow-y: auto;
    scrollbar-width: none;
  }

  main {
    grid-area: main;
    border: 2px solid green;
    display: flex;
    flex-direction: column;
  }
`

const GetStartedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`

const ChatPage = () => {
  const navigate = useNavigate();
  const { isAuthorized, loading } = useContext(AuthContext);
  const { activeChat } = useContext(ChatContext);

  useEffect(() => {
    if (loading) return;

    const storedToken = localStorage.getItem("token");
    
    if (!storedToken || !isAuthorized) {
      navigate("/login");
    }

  }, [isAuthorized, navigate, loading]);

  return (
    <Container>
      <aside>
        <ActiveConvoList />
        <ChatUserList />
      </aside>
      <main>
        {activeChat.chatId === null && (
          <GetStartedContainer>
            <MessageSquareText size={150}/>
            <h2> Select a user from the user list to start chatting!</h2>
          </GetStartedContainer>
        )}
        
        {activeChat.chatId !== null && (
          <>
            <ChatConvo />
            <ChatMessage />
          </>
        )}
      </main>
    </Container>
  );
};

export default ChatPage;
