import React, { useState } from "react";
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
  const cookies = new Cookies();
  const cookie = cookies.get("name");

  return (
    <>
      <Router>
        <Header isLoggedIn={isLoggedIn}>
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
            <Posts />
          </Route>
          <Route path="/new-post">
            <NewPost isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/profile">
            <ProfilePage isLoggedIn={isLoggedIn} />
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
