import React from "react";
import Cookies from "universal-cookie";

function Header({ children }) {
  const cookies = new Cookies();
  const displayName = cookies.get('name') ? cookies.get('name') : "Guest";

  return (
    <>
      <h1>WordPress REST API with React</h1>
      <div className="header">
        <p>Welcome {displayName}</p>
        {children}
      </div>
    </>
  );
}

export default Header;
