import styled from "styled-components";
import RegisterForm from "../components/RegisterForm";

const Container = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F8F8FF;
`

const RegisterPage = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;