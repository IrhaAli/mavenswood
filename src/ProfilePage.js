import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Posts from "./Posts";

// to get specific data: validate jwt and server side use that username to fetch data. Make sure key is needed to access enpoint.
function ProfilePage({ isLoggedIn, posts }) {
  const [myPosts, setMyPosts] = useState([]);
  const cookies = new Cookies();
  const name = cookies.get("name");

  useEffect(() => {
    setMyPosts(posts.filter((post) => post.author.includes(name)));
  }, [posts]);

  return isLoggedIn ? (
    window.location.replace("https://ns1.youngtalentz.com/apps/#/profile")
  ) : (
    <div className="App">
      <header className="App-header">
        <h1>Profile</h1>
        <p>
          {name
            ? `${name}'s User Profile`
            : "You are not currently logged in. Please login to see your user profile"}
        </p>
        <p>{cookies.get("email") || ""}</p>
      </header>
      <Posts posts={myPosts} />
    </div>
  );
}

export default ProfilePage;
