import React, { useState } from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import ProfilePage from "./ProfilePage";
import SignUp from "./SignUp";
import Posts from "./Posts";
import NewPost from "./NewPost";
import Cookies from "universal-cookie";
import LogOut from "./LogOut";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serverMessage, setServerMessage] = useState(false);
  const cookies = new Cookies();

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
            {!cookies.get('jwt') && <Link to="/signup">Sign Up</Link>}
            {!cookies.get('jwt') && <Link to="/login">Login</Link>}
            <Link to="/posts">Posts</Link>
            {cookies.get('jwt') && <Link to="/new-post">New Post</Link>}
            {cookies.get('jwt') && <Link to="/logout">Log Out</Link>}
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
          <Route path="/logout">
            <LogOut cookies={cookies}/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
