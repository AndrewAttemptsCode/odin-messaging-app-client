import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { AuthContext } from "../contexts/AuthContext";

const ConvoList = () => {
  const { activeConvos } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  if (activeConvos.length === 0) {
    return <p>No chats found</p>
  }

  return (
    <>
    {activeConvos && activeConvos.map((convo) => (
      <p key={convo.id}>{convo.user1Id === user.id ? convo.user2.username : convo.user1.username}</p>
    ))}
    </>
  );
};

export default ConvoList;