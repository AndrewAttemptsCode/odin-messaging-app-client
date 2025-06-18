import styled from "styled-components";
import capitalizeInitial from "../utils/capitalizeInitial";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({$size}) => `${$size}px`};
  width: ${({$size}) => `${$size}px`};
  border-radius: 50%;
  color: #ffffff;
  border: none;
  user-select: none;
  font-weight: bold;
  padding: 4px;
  background-color: ${({$bg}) => $bg};
`

const UserAvatar = ({ bg, size=40, username="?" }) => {
  const bgColor = bg || "#5f9ea0";
  return (
    <Container $bg={bgColor} $size={size}>
      {capitalizeInitial(username)}
    </Container>
  );
};

export default UserAvatar;