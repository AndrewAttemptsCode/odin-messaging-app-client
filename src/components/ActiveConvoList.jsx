import { ChevronUp } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ConvoList from "./ConvoList";
import { ChatContext } from "../contexts/ChatContext";

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

const ActiveConvoList = () => {
  const [expanded, setExpanded] = useState(false);
  const { activeConvos } = useContext(ChatContext);

  useEffect(() => {
    if (activeConvos.length > 0) {
      setExpanded(true);
    }
  }, [activeConvos]);

  return (
    <div>
      <Header onClick={() => setExpanded(!expanded)}>
        <h1>Chats</h1>
        <IconWrapper $expanded={expanded}>
          <ChevronUp size={30} />
        </IconWrapper>
      </Header>
      {expanded && <ConvoList />}
    </div>
  );
};

export default ActiveConvoList;
