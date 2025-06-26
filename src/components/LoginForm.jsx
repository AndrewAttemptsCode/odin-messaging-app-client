import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 300px;
  width: 90%;
  padding: max(2%, 1rem);
  color: #333333;
  background-color: #F5F5F5;
  border-radius: 10px;
  box-shadow: 0 0 5px 5px #9370DB;

  h1 {
    padding: 0;
    margin: 0;
    line-height: 1.0;
    text-align: center;
    margin-bottom: 2rem;
    color: #191970;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    padding: 8px;
    width: 100%;
    border: none;
  }

  input:focus {
    outline: 2px solid #9370DB;
  }
`

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

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
    transform: translate(-4px, -18px);
    font-size: 0.75rem;
    padding: 1px 4px;
    border-radius: 5px;
    background-color: white;
    color: #4d4c4c;
  }
`

const SubmitButton = styled.button`
  border: ${({$isFilled}) => ($isFilled ? "2px solid #9370DB" : "2px solid transparent")};
  padding: 8px;
  width: 100%;
  cursor: pointer;
  transition: border 0.3s ease-in-out;
`

const LoginForm = () => {
  const [userData, setUserData] = useState({username: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([{}]);
  const navigate = useNavigate();

  const isFilled = userData.username.trim() !== "" && userData.password.trim() !== "";

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.errors)) {
          setErrors(data.errors);
        } else {
          setErrors([{ path: "general", msg: data.message }])
        }
        return;
      }

      localStorage.setItem("token", data);
      navigate("/");

    } catch (error) {
      console.error("Error logging in", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <input type="text" name="username" id="username" placeholder="" value={userData.username} onChange={handleOnChange} />
          <label htmlFor="username">Username</label>
        <p>{ errors?.find(error => error.path === "username")?.msg }</p>
        </InputWrapper>
        <InputWrapper>
          <input type="password" name="password" id="password" placeholder="" value={userData.password} onChange={handleOnChange} />
          <label htmlFor="password">Password</label>
          <p>{ errors?.find(error => error.path === "password")?.msg }</p>
          <p>{ errors?.find(error => error.path === "general")?.msg }</p>
        </InputWrapper>
        <p>Need an account? <Link to={"/register"}>Register</Link></p>
        <SubmitButton type="submit" disabled={loading} $isFilled={isFilled}>{ loading ? "Processing..." : "Login" }</SubmitButton>
      </Form>
    </Container>
  );
};

export default LoginForm;