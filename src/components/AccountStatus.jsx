import { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import capitalize from "../utils/capitalize";
import { ChevronDown, LogOut, Settings } from "lucide-react";

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
`

const StatusWrapper = styled.div`
  display: flex;
`

const DropMenu = styled.nav`
  position: absolute;
  top: 115%;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: red;
  padding: 0.5rem;
  gap: 0.5rem;
  min-width: 120px;
`

const MenuItem = styled.div`
  display: flex;
  gap: 0.5rem;
`

const AccountStatus = () => {
  const { user, logout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <Container onClick={() => setExpanded(!expanded)}>
      <StatusWrapper>
        {capitalize(user.username)}
        <ChevronDown />
      </StatusWrapper>
      {expanded && 
        <DropMenu>
          <MenuItem>
            <Settings />
            <p>Settings</p>
          </MenuItem>
          <MenuItem>
            <LogOut />
            <p onClick={() => logout()}>Logout</p>
          </MenuItem>
        </DropMenu>
      }
    </Container>
  );
};

export default AccountStatus;