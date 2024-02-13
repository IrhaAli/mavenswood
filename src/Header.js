import React from "react";

function Header({ children, name, isFooter }) {
  const styles = {
    "margin-top": isFooter ? "50px" : "0px"
  }

  return (
    <div className="header" style={styles}>
      {name && <p>Welcome {name}</p>}
      {children}
    </div>
  );
}

export default Header;
