import styled from "styled-components";

const Container = styled.div`
  color: blueviolet;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem;
`

const Logo = () => {
  return (
    <Container>
      Messenger
    </Container>
  );
};

export default Logo;