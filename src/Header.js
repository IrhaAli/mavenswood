import react from "react";

function Header({ children, ...props }) {
  const displayName = props.isLoggedIn ? props.userName : "Guest";

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
