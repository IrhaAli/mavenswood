import React, { useState } from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import ProfilePage from "./ProfilePage";
import SignUp from "./SignUp";
import Posts from "./Posts";
import NewPost from "./NewPost";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serverMessage, setServerMessage] = useState(false);
  return (
    <>
      <Router>
        <Header
          username={username}
          isLoggedIn={isLoggedIn}
          serverMessage={serverMessage}
        >
          <nav>
            <Link to="/">Profile</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/new-post">New Post</Link>
          </nav>
        </Header>
        <Switch>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/new-post">
            <NewPost setServerMessage={setServerMessage} />
          </Route>
          <Route exact path="/">
            <ProfilePage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
              username={username}
              serverMessage={serverMessage}
              setServerMessage={setServerMessage}
            />
          </Route>
          <Route path="/login">
            <Login
              setUsername={setUsername}
              setIsLoggedIn={setIsLoggedIn}
              serverMessage={serverMessage}
              setServerMessage={setServerMessage}
            />
          </Route>
          <Route path="/signup">
            <SignUp
              setUsername={setUsername}
              setIsLoggedIn={setIsLoggedIn}
              serverMessage={serverMessage}
              setServerMessage={setServerMessage}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
