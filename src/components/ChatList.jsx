import { useEffect, useState } from "react";

const ChatList = () => {
  const [users, setUsers] = useState([{ id: 0, username: "" }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
        method: "get",
      });

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
      
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {users.map(user => (
        <p key={user.id}>{user.username}</p>
      ))}
    </>
  )
}

export default ChatList;