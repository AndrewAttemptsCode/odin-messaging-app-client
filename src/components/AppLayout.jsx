import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import AccountStatus from "./AccountStatus";

const Container = styled.div`
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;

  header {
    flex-shrink: 0;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  main {
    flex: 1;
    overflow: hidden;
  }
`

const AppLayout = () => {
  return (
    <Container>
      <header>
        <Logo />
        <AccountStatus />
      </header>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default AppLayout;
