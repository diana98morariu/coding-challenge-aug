import React, { useState, useEffect } from "react";
import "./App.sass";
import StoryCard from "./components/StoryCard/StoryCard";
import ClipLoader from "react-spinners/ClipLoader";

const topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";
const randomStories = [];

async function getAndSortData() {
  const apiCallIds = await fetch(topStoriesUrl);
  const ids = await apiCallIds.json();
  if (ids) {
    for (let i = 0; i < 10; i++) {
      var num = Math.floor(Math.random() * ids.length);
      const apiCallStories = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${ids[num]}.json`
      );
      const story = await apiCallStories.json();
      if (story) {
        randomStories.push(story);
        const apiCallUsers = await fetch(
          `https://hacker-news.firebaseio.com/v0/user/${story.by}.json`
        );
        const user = await apiCallUsers.json();
        if (user) {
          randomStories[i].authorKarma = user.karma;
        }
      }
    }
  }
  randomStories.sort((a, b) => (a.score > b.score ? 1 : -1));
  return randomStories;
}

const App = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAndSortData();
      setStories(data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Hacker News</h1>
      {stories.length === 10 ? (
        <div className="stories-container">
          {stories.map((randomStory) => {
            return (
              <div className="story-card" key={randomStory.id}>
                <StoryCard randomStory={randomStory} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="loading">
          <ClipLoader size={50} color={"#e83251"} />
        </div>
      )}
    </div>
  );
};
export default App;
