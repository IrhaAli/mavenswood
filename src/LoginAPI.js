import React, { useEffect } from "react";
import Cookies from "universal-cookie";


function LoginAPI(props) {
  useEffect(() => {
    if (props.APIDetailsLogin.user.length > 0) {
      const url = ``;
      fetch(url, {
        method: "POST",
      })
        .then((response) => response.json()) //json
        .then((data) => {
          if (data["success"]) {
            const cookies = new Cookies();
            cookies.set("jwt", data["jwt"]);
            cookies.set("name", data["user_display_name"]);
            cookies.set("email", data["user_email"]);
            window.location.replace("http://localhost:3000/apps/test_app");
          } else {
            props.setServerMessage(data["data"]["message"]);
          }
        });
    }
  }, [props.APIDetailsLogin]);

  return <></>;
}

export default LoginAPI;
