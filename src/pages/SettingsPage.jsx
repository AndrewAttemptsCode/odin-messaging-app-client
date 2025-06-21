import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ChatConvoMessage from "../components/ChatConvoMessage";
import { ChatContext } from "../contexts/ChatContext";

const Container = styled.div`
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
`

const SettingsWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  border: 1px solid blue;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  gap: 1rem;
`

const FormItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  input[type="color"] {
    height: 40px;
    width: 40px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`

const SettingsPage = () => {
  const { loading, isAuthorized, user } = useContext(AuthContext);
  const { chatUsers } = useContext(ChatContext);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [load, setLoad] = useState(false);
  
  const selectedUser = chatUsers?.find((chatUser) => chatUser.id === user.id);

  useEffect(() => {
    if (loading) return;

    const storedToken = localStorage.getItem("token");

    if (!storedToken || !isAuthorized) {
      navigate("/login");
    }

    if (selectedUser) {
      setUserDetails({
        avatarColor: selectedUser.avatarColor,
        usernameColor: selectedUser.usernameColor,
      });
    };

  }, [navigate, isAuthorized, loading, selectedUser]);

const handleOnChange = (event) => {
  const { name, value } = event.target;
  setUserDetails(prev => (
    {
      ...prev,
      [name]: value,
    }
  ))
};

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    setLoad(true);
    const storedToken = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${user.id}`, {
      method: "put",
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${storedToken}`,
      },
      body: JSON.stringify(userDetails), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Update user settings response error", errorData);
      return;
    }

    const updatedUser = await response.json();
    console.log("User settings updated", updatedUser);

  } catch (err) {
    console.error("Failed to update user settings", err);
  } finally {
    setLoad(false);
  }
}

  return (
    <Container>
      <SettingsWrapper>
        <h1>Settings</h1>
        <h2>Chat Preview</h2>
        <ChatConvoMessage
          username={selectedUser?.username || "?"}
          message="Message preview..."
          createdAt={Date.now()}
          avatarColor={userDetails.avatarColor}
          usernameColor={userDetails.usernameColor}
        />
        <h2>Customize</h2>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            <input type="color" name="avatarColor" id="avatarColor" value={userDetails.avatarColor} onChange={handleOnChange} />
            <label htmlFor="avatarColor">Avatar Background Colour</label>
          </FormItem>
          <FormItem>
            <input type="color" name="usernameColor" id="usernameColor" value={userDetails.usernameColor} onChange={handleOnChange} />
            <label htmlFor="usernameColor">Username Colour</label>
          </FormItem>
          <button type="submit" disabled={load}>{load ? "Processing" : "Apply Changes"}</button>
        </Form>
      </SettingsWrapper>
    </Container>
  );
};

export default SettingsPage;