import React, { useState } from "react";
import logo from "./logo.svg";
import NewPostAPI from "./NewPostAPI";

function NewPost(props) {
  const [APIDetailsPost, setAPIDetailsPost] = useState({
    title: "",
    content: "",
  });
  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setPostDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit() {
    setAPIDetailsPost({ ...postDetails }); //check i need the ...here
  }
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h2>New Post</h2>
          <p>{props.serverMessage}</p>
          <div className="login">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={postDetails.title}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Content"
              name="content"
              value={postDetails.content}
              onChange={handleChange}
            />
            <input type="submit" value="Go" onClick={handleSubmit} />
          </div>
          <img src={logo} className="App-logo" alt="logo"></img>
        </header>
      </div>
      <NewPostAPI
        APIDetailsPost={APIDetailsPost}
        setServerMessage={props.setServerMessage}
      />
    </>
  );
}

export default NewPost;
