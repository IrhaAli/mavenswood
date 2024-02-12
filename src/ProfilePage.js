import React from 'react'
import logo from './logo.svg';
import Cookies from "universal-cookie";

// to get specific data: validate jwt and server side use that username to fetch data. Make sure key is needed to access enpoint.
function ProfilePage() {
  const cookies = new Cookies();
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile</h1>
        <p>{(cookies.get('name')) ? `${cookies.get('name')}'s User Profile` : 'You are not currently logged in. Please login to see your user profile'}</p>
        <p>{cookies.get('email') || ''}</p>
        <img src={logo} className="App-logo" alt="logo"/>
      </header>
    </div>
  );
}

export default ProfilePage;