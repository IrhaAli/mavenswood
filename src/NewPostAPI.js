import React, { useEffect } from "react";
import Cookies from "universal-cookie";

function NewPostAPI(props) {
  const cookies = new Cookies();
  
  useEffect(() => {
    if (props.APIDetailsPost.title.length > 0) {
      const url = `https://ns1.youngtalentz.com/wp-json/wp/v2/posts?title=${props.APIDetailsPost.title}&content=${props.APIDetailsPost.content}&status=publish`;
      fetch(url, {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${cookies.get('jwt')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["success"] === true) {
            window.location.replace("https://ns1.youngtalentz.com/apps/test_app");
          } else {
            console.log(data);
            props.setServerMessage(data["data"]["message"]);
          }
        });
    }
  }, [props.APIDetailsPost]);

  return <></>;
}

export default NewPostAPI;
