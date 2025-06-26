import styled from "styled-components";
import capitalize from "../utils/capitalize";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: fit-content;
  width: 90%;
  padding: max(2%, 1rem);
  color: #333333;
  background-color: #F5F5F5;
  border-radius: 10px;
  box-shadow: 0 0 5px 5px #9370DB;

  h1 {
    color: #191970;
  }

  a {
    font-size: 1.1rem;
    font-weight: bold;
  }
`

const AccountCreatedNotice = ({ user }) => {
  return (
    <Container>
      <h1>Welcome, {capitalize(user.username)}.</h1>
      <p>Your account has been created!</p>
      <Link to={"/login"}>Login</Link>
    </Container>
  );
};

export default AccountCreatedNotice;