import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F8F8FF;
`

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      navigate("/");
    }

  }, [navigate]);

  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;