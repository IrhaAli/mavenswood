import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

function NewPost({ isLoggedIn }) {
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
    if (postDetails.title.length > 0 && postDetails.content.length > 0) {
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
            window.location.replace("https://ns1.youngtalentz.com/apps");
          } else {
            setServerMessage(
              "There was an error adding the post. Please, try again."
            );
          }
        });
    } else {
      setServerMessage("Please add a title and some content");
    }
  }

  return isLoggedIn ? (
    window.location.replace("https://ns1.youngtalentz.com/apps/#/profile")
  ) : (
      <header>
        <h2>New Post</h2>
        {serverMessage && <p>{serverMessage}</p>}
        <div className="login">
          <textarea
            type="text"
            placeholder="Title"
            name="title"
            value={postDetails.title}
            onChange={handleChange}
          />
          <textarea
            type="text"
            placeholder="Content"
            name="content"
            className="post-content"
            value={postDetails.content}
            onChange={handleChange}
            rows="5"
          />
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </div>
      </header>
  );
}

export default NewPost;
