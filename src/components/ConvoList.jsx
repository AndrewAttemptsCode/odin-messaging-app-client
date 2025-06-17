import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { AuthContext } from "../contexts/AuthContext";

const ConvoList = () => {
  const { activeConvos, connectChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const handleOnClick = (receiverId) => {
    connectChat(user.id, receiverId);
  }

  if (activeConvos.length === 0) {
    return <p>No chats found</p>
  }

  return (
    <>
    {activeConvos && activeConvos.map((convo) => {
      const otherUser = convo.user1Id === user.id ? convo.user2 : convo.user1;
      return (
        <div key={convo.id} onClick={() => handleOnClick(otherUser.id)}>{otherUser.username}</div>
      );
    })}
    </>
  );
};

export default ConvoList;