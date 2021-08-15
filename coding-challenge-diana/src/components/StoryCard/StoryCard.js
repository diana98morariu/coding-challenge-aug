import React, { useState, useEffect } from "react";
import {
  FcLike,
  FcCalendar,
  FcManager,
  FcCloseUpMode,
  FcLink,
} from "react-icons/fc";
import { BsBoxArrowUpRight } from "react-icons/bs";
import NewsImage from "../../news.jpg";
import "./StoryCard.sass";

const StoryCard = ({ randomStory, users }) => {
  const [user, setUser] = useState("");
  const time = randomStory.time;
  const dateObject = new Date(time * 1000);
  const timestamp = dateObject.toLocaleString("en-EN", { dateStyle: "long" });

  useEffect(() => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === randomStory.by) {
        setUser(users[i]);
      }
    }
  }, [randomStory.by, users]);

  return (
    <div className="card">
      <div className="image-container"></div>
      <div className="text-container">
        <h2>
          {randomStory.title}
          <a className="link" href={randomStory.url}>
            Go to source
            <BsBoxArrowUpRight />
          </a>
        </h2>

        <div className="card-bottom">
          <div className="card-bottom-left">
            <p>
              <FcLike />
              {randomStory.score}
            </p>
            <p>
              <FcCalendar />
              {timestamp}
            </p>
          </div>
          <div className="card-bottom-right">
            <p>
              <FcManager />
              {user.id}
            </p>
            <p>
              <FcCloseUpMode />
              {user.karma}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoryCard;
