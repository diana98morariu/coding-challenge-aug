import React, { useEffect } from "react";
// import "./styles.sass";

const App = () => {
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
    console.log(randomStories);
  }

  useEffect(() => {
    getAndSortData();
  }, [randomStories]);

  return (
    <div className="app">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
};
export default App;
