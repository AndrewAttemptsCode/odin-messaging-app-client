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
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas: "aside main";

  @media (max-width: 769px) {
    grid-template-columns: 1fr;
    grid-template-areas: "main";

    aside {
      position: absolute;
      top: 0;
      left: 0;
      background-color: white;
      z-index: 10;
      transform: ${({$menuOpen}) => $menuOpen ? "translateX(0)" : "translateX(-100%)"} ;
      width: 200px;
      height: 100%;
      transition: transform 0.3s ease-in-out;
    }
  }

  aside {
    grid-area: aside;
    background-color: #F8F8FF;
    color: #333333;
    border-right: 2px solid #9370DB;
    overflow-y: auto;
    scrollbar-width: none;
  }

  main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    background-color: #F8F8FF;
  }
`

const GetStartedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  text-align: center;

  h2 {
    color: #191970;
  }
`

const ChatPage = () => {
  const navigate = useNavigate();
  const { isAuthorized, loading } = useContext(AuthContext);
  const { activeChat, menuOpen } = useContext(ChatContext);

  useEffect(() => {
    if (loading) return;

    const storedToken = localStorage.getItem("token");
    
    if (!storedToken || !isAuthorized) {
      navigate("/login");
    }

  }, [isAuthorized, navigate, loading]);

  return (
    <Container $menuOpen={menuOpen}>
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
