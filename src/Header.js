import React from "react";

function Header({ children, name, isFooter }) {
  const styles = {
    "margin-top": isFooter ? "50px" : "0px"
  }
  const headerStyles = {
    "margin": "40px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center"
  }

  return (
    <div className="header" style={styles}>
      {name && <p style={headerStyles}>Welcome {name}</p>}
      {children}
    </div>
  );
}

export default Header;
