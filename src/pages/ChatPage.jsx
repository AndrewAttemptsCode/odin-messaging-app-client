import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "aside main";
  border: 2px solid red;

  aside {
    grid-area: aside;
    border: 2px solid blue;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  main {
    grid-area: main;
    border: 2px solid green;
  }
`

const ChatPage = () => {
  return (
    <Container>
      <aside>
        {[...Array(100)].map((_, i) => (
            <p key={i}>This is a sidebar test {i + 1}</p>
          ))}
      </aside>
      <main>
        main
      </main>
    </Container>
  );
};

export default ChatPage;
