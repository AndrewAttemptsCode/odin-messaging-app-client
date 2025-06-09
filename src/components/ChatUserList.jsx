import { ChevronUp } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import ChatList from "./ChatList";

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const IconWrapper = styled.div`
  transition: transform 0.3s ease;
  transform: ${({ $expanded }) => ($expanded ? "rotate(180deg)" : "rotate(0deg)")};  
`

const ChatUserList = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <Header onClick={() => setExpanded(!expanded)}>
        <h1>Users</h1>
        <IconWrapper $expanded={expanded}>
          <ChevronUp size={30} />
        </IconWrapper>
      </Header>
      {expanded && <ChatList />}
    </div>
  );
};

export default ChatUserList;
