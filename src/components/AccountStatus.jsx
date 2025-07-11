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

  p {
    color: #333333;

    @media (max-width: 424px) {
      display: none;
    }
  }
`

const DropMenu = styled.nav`
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #F8F8FF;
  border: 2px solid #9370DB;
  min-width: 180px;
  z-index: 10;
`

const MenuItem = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  color: #333333;

  a {
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    background-color: #B0C4DE;
  }
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
        <p>{capitalize(user.username)}</p>
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