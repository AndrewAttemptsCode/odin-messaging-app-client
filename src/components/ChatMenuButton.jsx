import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import styled from "styled-components";
import { Menu } from "lucide-react";

const StyledMenu = styled(Menu)`
  cursor: pointer;
`

const ChatMenuButton = () => {
  const { menuOpen, setMenuOpen } = useContext(ChatContext);

  return (
    <StyledMenu
      onClick={() => setMenuOpen(!menuOpen)}
    />
  );
};

export default ChatMenuButton;