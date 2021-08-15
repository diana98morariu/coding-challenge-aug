import React, { useState, useEffect } from "react";

const StoryCard = ({ randomStory, users }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === randomStory.by) {
        setUser(users[i]);
      }
    }
  }, [randomStory.by, users]);

  return (
    <div className="container">
      <h1>{randomStory.title}</h1>
      <p>{user.id}</p>
      <p>{user.karma}</p>
    </div>
  );
};
export default StoryCard;
