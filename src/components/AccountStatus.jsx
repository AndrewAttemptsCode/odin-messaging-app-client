import { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import capitalize from "../utils/capitalize";
import { ChevronDown, LogOut, MessageSquareText, Settings } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { ChatContext } from "../contexts/ChatContext";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
`

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const DropMenu = styled.nav`
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: red;
  padding: 1rem;
  gap: 1rem;
  min-width: 180px;
`

const MenuItem = styled.div`
  display: flex;
  gap: 0.5rem;
`

const AccountStatus = () => {
  const { user, logout } = useContext(AuthContext);
  const { chatUsers } = useContext(ChatContext);
  const [expanded, setExpanded] = useState(false);

  const userSettings = chatUsers?.find(chatUser => chatUser.id === user.id);
  
  return (
    <Container onClick={() => setExpanded(!expanded)}>
      <StatusWrapper>
        <UserAvatar bg={userSettings?.avatarColor} username={user.username} />
        {capitalize(user.username)}
        <ChevronDown />
      </StatusWrapper>
      {expanded && 
        <DropMenu>
          <MenuItem>
            <MessageSquareText />
            <p><Link to={"/"}>Chat</Link></p>
          </MenuItem>
          <MenuItem>
            <Settings />
            <p><Link to={"settings"}>Settings</Link></p>
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