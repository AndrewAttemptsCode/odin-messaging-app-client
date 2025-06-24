import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import AccountStatus from "./AccountStatus";
import AuthProvider from "../contexts/AuthContext";
import { ChatProvider } from "../contexts/ChatContext";
import ChatMenuButton from "./ChatMenuButton";

const Container = styled.div`
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;

  header {
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  main {
    flex: 1;
    overflow: hidden;
  }
`

const MenuLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`

const AppLayout = () => {
  return (
    <AuthProvider>
      <Container>
        <ChatProvider>
        <header>
          <MenuLogoWrapper>
            <ChatMenuButton />
            <Logo />
          </MenuLogoWrapper>
          <AccountStatus />
        </header>
          <main>
            <Outlet />
          </main>
        </ChatProvider>
      </Container>
    </AuthProvider>
  );
};

export default AppLayout;
