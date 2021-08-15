import React, { useState, useEffect } from "react";
import "./App.sass";
import StoryCard from "./components/StoryCard.js";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";
  const [topStoriesIds, setTopStoriesIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [randomStories, setRandomStories] = useState([]);

  useEffect(() => {
    fetch(topStoriesUrl)
      .then((response) => {
        return response.json();
      })
      .then((ids) => {
        setTopStoriesIds(ids);
      });
  }, []);

  useEffect(() => {
    if (topStoriesIds.length !== 0) {
      for (let i = 0; i < 10; i++) {
        const num = Math.floor(Math.random() * topStoriesIds.length);
        // setRandomIds((randomIds) => [...randomIds, topStoriesIds[num]]);
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${topStoriesIds[num]}.json`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((story) => {
            setRandomStories((randomStories) => [...randomStories, story]);
          });
      }
    }
  }, [topStoriesIds]);

  useEffect(() => {
    if (randomStories.length !== 0) {
      for (let i = 0; i < randomStories.length; i++) {
        fetch(
          `https://hacker-news.firebaseio.com/v0/user/${randomStories[i].by}.json`
        )
          .then((response) => {
            return response.json();
          })
          .then((user) => {
            setUsers((users) => [...users, user]);
          });
      }
    }
  }, [randomStories]);

  if (randomStories.length !== 10)
    return (
      <div className="loading">
        <ClipLoader size={50} color={"#e83251"} />
      </div>
    );
  else {
    return (
      <div className="App">
        <h1>Hacker News</h1>

        <div className="stories-container">
          {randomStories.map((randomStory) => {
            return (
              <div className="story-card" key={randomStory.id}>
                <StoryCard randomStory={randomStory} users={users} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
export default App;
