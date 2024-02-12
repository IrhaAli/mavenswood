import React, { useState } from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import ProfilePage from "./ProfilePage";
import SignUp from "./SignUp";
import Posts from "./Posts";
import NewPost from "./NewPost";
import LogOut from "./LogOut";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
        >
          <nav>
            <Link to="/">Home Page</Link>
            {!isLoggedIn && <Link to="/signup">Sign Up</Link>}
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {isLoggedIn && <Link to="/profile">Profile</Link>}
            {isLoggedIn && <Link to="/new-post">New Post</Link>}
            {isLoggedIn && <Link to="/logout">Log Out</Link>}
          </nav>
        </Header>
        <Switch>
          <Route exact path="/">
            <Posts />
          </Route>
          <Route path="/new-post">
            <NewPost />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
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
      </Router>
    </>
  );
}

export default App;
