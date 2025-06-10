import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-width: 320px;
  max-width: 300px;
  width: 100%;
  padding: 2rem;
  background-color: cadetblue;
  border-radius: 10px;
  box-shadow: 0 0 10px 5px #038620;

  h1 {
    padding: 0;
    margin: 0;
    line-height: 1.0;
    text-align: center;
    margin-bottom: 2rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;

  input, button {
    padding: 8px;
    margin-bottom: 1rem;
    width: 100%;
    border: none;
  }

  input:focus {
    outline: 2px solid #038620;
  }
`

const InputWrapper = styled.div`
  position: relative;

  label {
    position: absolute;
    left: 10px;
    top: 8px;
    user-select: none;
    cursor: text;
    color: #888;
    transition: all 0.3s ease;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    transform: translate(-4px, -20px) scale(0.9);
    padding: 1px 4px;
    border-radius: 5px;
    background-color: white;
    color: #4d4c4c;
  }
`

const LoginForm = () => {
  return (
    <Container>
      <h1>Login</h1>
      <Form action="">
        <InputWrapper>
          <input type="text" name="username" id="username" placeholder="" />
          <label htmlFor="username">Username</label>
        </InputWrapper>
        <InputWrapper>
          <input type="password" name="password" id="password" placeholder="" />
          <label htmlFor="password">Password</label>
        </InputWrapper>
        <p>Need an account? <Link to={"/register"}>Register</Link></p>
        <button type="submit">Login</button>
      </Form>
    </Container>
  );
};

export default LoginForm;