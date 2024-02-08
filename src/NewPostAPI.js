import React, { useEffect } from "react";

function NewPostAPI(props) {
  useEffect(() => {
    const url = `https://ns1.youngtalentz.com/wp-json/wp/v2/posts?title=${props.APIDetailsPost.title}&content=${props.APIDetailsPost.content}`;
    fetch(url, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        'Authorization': 'Basic aXJoYWFsaV85N0Bob3RtYWlsLmNhOlN1NFAgZUpLSiBoelU3IHJiUk8gd0l2ZiBQRk91'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["success"] === true) {
          console.log(data);
        } else {
          console.log(data);
          props.setServerMessage(data["data"]["message"]);
        }
      });
  }, [props.APIDetailsPost]);

  return <></>;
}

export default NewPostAPI;
