import styled from "styled-components";
import capitalize from "../utils/capitalize";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AccountCreatedNotice = ({ user }) => {
  return (
    <Container>
      <h1>{capitalize(user.username)}!</h1>
      <p>Your account has been created</p>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/login"}>Login</Link>
      </div>
    </Container>
  );
};

export default AccountCreatedNotice;