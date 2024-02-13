import React from "react";
import Cookies from "universal-cookie";

function Header({ children }) {
  const cookies = new Cookies();
  const displayName = cookies.get("name") ? cookies.get("name") : "Guest";

  return (
    <>
      <div className="header">
        <p>Welcome {displayName}</p>
        {children}
      </div>
    </>
  );
}

export default Header;
