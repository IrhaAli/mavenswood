import React, { useState, useEffect } from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import ProfilePage from "./ProfilePage";
import SignUp from "./SignUp";
import Posts from "./Posts";
import NewPost from "./NewPost";
import LogOut from "./LogOut";
import Cookies from "universal-cookie";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const cookies = new Cookies();
  const cookie = cookies.get("name");

  const pairedUsers = function (fetchedUsers) {
    const users = {};
    for (const user of fetchedUsers) {
      users[`${user.id}`] = user.name;
    }
    return users;
  };

  useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await fetch(
        "https://ns1.youngtalentz.com/wp-json/wp/v2/posts"
      );
      const fetchedUsers = await fetch(
        "https://ns1.youngtalentz.com/wp-json/wp/v2/users"
      );
      if (!fetchedPosts.ok || !fetchedUsers.ok) {
        return;
      }
      let users = await fetchedUsers.json();
      let posts = await fetchedPosts.json();
      users = pairedUsers(users);
      posts = posts.map((post) => ({
        ...post,
        author: users[`${post.author}`],
        title: post.title.rendered,
        content: post.content.rendered,
      }));
      setPosts(posts);
    }

    loadPosts();
  }, []);

  return (
    <>
      <Router>
        <Header
          name={cookies.get("name") ? cookies.get("name") : "Guest"}
          isFooter={false}
        >
          <nav>
            <Link to="/">Home Page</Link>
            {!cookie && <Link to="/signup">Sign Up</Link>}
            {!cookie && <Link to="/login">Login</Link>}
            {cookie && <Link to="/profile">Profile</Link>}
            {cookie && <Link to="/new-post">New Post</Link>}
            {cookie && <Link to="/logout">Log Out</Link>}
          </nav>
        </Header>
        <Switch>
          <Route exact path="/">
            <Posts posts={posts} />
          </Route>
          <Route path="/new-post">
            <NewPost isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/profile">
            <ProfilePage isLoggedIn={isLoggedIn} posts={posts} />
          </Route>
          <Route path="/login">
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/signup">
            <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/logout">
            <LogOut />
          </Route>
        </Switch>
        <Header name={""} isFooter={true} />
      </Router>
    </>
  );
}

export default App;
