import React from "react";
import Cookies from "universal-cookie";

// to get specific data: validate jwt and server side use that username to fetch data. Make sure key is needed to access enpoint.
function ProfilePage({ isLoggedIn }) {
  const cookies = new Cookies();

  return isLoggedIn ? (
    window.location.replace(
      "https://ns1.youngtalentz.com/apps/#/profile"
    )
  ) : (
    <div className="App">
      <header className="App-header">
        <h1>Profile</h1>
        <p>
          {cookies.get("name")
            ? `${cookies.get("name")}'s User Profile`
            : "You are not currently logged in. Please login to see your user profile"}
        </p>
        <p>{cookies.get("email") || ""}</p>
      </header>
    </div>
  );
}

export default ProfilePage;
