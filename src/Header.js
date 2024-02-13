import React from "react";

function Header({ children, name }) {

  return (
      <div className="header">
        <p>Welcome {name}</p>
        {children}
      </div>
  );
}

export default Header;
