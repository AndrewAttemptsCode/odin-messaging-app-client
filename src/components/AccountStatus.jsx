import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import capitalize from "../utils/capitalize";

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const AccountStatus = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Container>
      {capitalize(user.username)}
      <button onClick={() => logout()}>Logout</button>
    </Container>
  );
};

export default AccountStatus;