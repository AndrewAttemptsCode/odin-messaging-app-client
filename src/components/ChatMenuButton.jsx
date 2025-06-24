import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import styled from "styled-components";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

const StyledMenu = styled(Menu)`
  cursor: pointer;
  margin: 0.5rem;

  @media (min-width: 770px) {
    display: none;
  }
`

const ChatMenuButton = () => {
  const { menuOpen, setMenuOpen } = useContext(ChatContext);
  const location = useLocation();

  return (
    location.pathname === "/" &&
    <StyledMenu
      onClick={() => setMenuOpen(!menuOpen)}
    />
  );
};

export default ChatMenuButton;