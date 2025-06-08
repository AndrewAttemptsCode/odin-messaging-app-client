import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;

  header {
    flex-shrink: 0;
  }

  main {
    flex: 1;
    overflow: hidden;
  }
`

const AppLayout = () => {
  return (
    <Container>
      <header>header</header>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default AppLayout;
