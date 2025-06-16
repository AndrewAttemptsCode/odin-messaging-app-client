import styled from "styled-components";
import ChatConvo from "../components/ChatConvo";
import ChatMessage from "../components/ChatMessage";
import ChatUserList from "../components/ChatUserList";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ActiveConvoList from "../components/ActiveConvoList";

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
    scrollbar-width: thin;
  }

  main {
    grid-area: main;
    border: 2px solid green;
    display: flex;
    flex-direction: column;
  }
`

const ChatPage = () => {
  const navigate = useNavigate();
  const { isAuthorized, loading } = useContext(AuthContext);

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
        <ChatConvo />
        <ChatMessage />
      </main>
    </Container>
  );
};

export default ChatPage;
