import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

function NewPost({ isLoggedIn }) {
  const [postSubmitted, setPostSubmitted] = useState(false);
  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
  });
  const cookies = new Cookies();
  const [serverMessage, setServerMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setPostDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit() {
    postDetails.title.length > 0 || postDetails.content.length > 0
      ? setPostSubmitted((prev) => !prev)
      : setServerMessage("Please enter a title and content");
  }

  useEffect(() => {
    if (postDetails.title.length > 0 || postDetails.content.length > 0) {
      const url = `https://ns1.youngtalentz.com/wp-json/wp/v2/posts?title=${postDetails.title}&content=${postDetails.content}&status=publish`;
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.get("jwt")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setServerMessage("");
            window.location.replace(
              "https://ns1.youngtalentz.com/apps"
            );
          } else {
            setServerMessage(
              "There was an error adding the post. Please, try again."
            );
          }
        });
    }
  }, [postSubmitted]);

  return isLoggedIn ? (
    window.location.replace(
      "https://ns1.youngtalentz.com/apps/#/profile"
    )
  ) : (
    <>
      <div className="App">
        <header className="App-header">
          <h2>New Post</h2>
          <p>{serverMessage}</p>
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
        </header>
      </div>
    </>
  );
}

export default NewPost;
