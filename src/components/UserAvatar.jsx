import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  color: white;
  border: none;
  user-select: none;
  font-weight: bold;
  padding: 4px;
  background-color: cadetblue;
`

const UserAvatar = () => {
  return (
    <Container>
      A
    </Container>
  );
};

export default UserAvatar;