import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
`

const ChatConvo = () => {
  return (
    <Container>
      {[...Array(100)].map((_, i) => (
        <p key={i}>This is a test message { i + 1 }</p>
      ))}
    </Container>
  );
};

export default ChatConvo;