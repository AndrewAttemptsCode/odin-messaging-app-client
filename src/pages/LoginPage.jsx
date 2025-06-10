import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const Container = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`

const LoginPage = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;