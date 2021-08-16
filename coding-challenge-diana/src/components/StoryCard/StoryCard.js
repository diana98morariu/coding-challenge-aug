import React, { useState, useEffect } from "react";
import { FcLike, FcCalendar, FcManager, FcCloseUpMode } from "react-icons/fc";
import { BsBoxArrowUpRight } from "react-icons/bs";
import "./StoryCard.sass";

const StoryCard = ({ randomStory }) => {
  const time = randomStory.time;
  const dateObject = new Date(time * 1000);
  const timestamp = dateObject.toLocaleString("en-EN", { dateStyle: "long" });

  return (
    <div className="card">
      <div className="image-container"></div>
      <div className="text-container">
        <h2>
          {randomStory.title}
          <a
            className="link"
            href={randomStory.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to source
            <BsBoxArrowUpRight />
          </a>
        </h2>

        <div className="card-bottom">
          <div className="card-bottom-left">
            <div className="text" title="Score">
              <div className="icon">
                <FcLike />
              </div>
              {randomStory.score}
            </div>
            <div className="text" title="Timestamp">
              <div className="icon">
                <FcCalendar />
              </div>
              {timestamp}
            </div>
          </div>
          <div className="card-bottom-right">
            <div className="text" title="Author">
              <div className="icon">
                <FcManager />
              </div>
              {randomStory.by}
            </div>
            <div className="text" title="Author karma">
              <div className="icon">
                <FcCloseUpMode />
              </div>
              {randomStory.authorKarma}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoryCard;
