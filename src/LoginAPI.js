import React, { useEffect } from "react";
import Cookies from "universal-cookie";

function LoginAPI(props) {
  useEffect(() => {
    if (props.APIDetailsLogin.email.length > 0) {
      const url = `https://ns1.youngtalentz.com/wp-json/jwt-auth/v1/token`;
      let formData = new FormData();
      formData.append("username", props.APIDetailsLogin.email);
      formData.append("password", props.APIDetailsLogin.pass);
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then((response) => response.json()) //json
        .then((data) => {
          if (data.token) {
            const cookies = new Cookies();
            cookies.set("jwt", data["jwt"]);
            cookies.set("name", data["user_display_name"]);
            cookies.set("email", data["user_email"]);
            window.location.replace(
              "https://ns1.youngtalentz.com/apps/test_app/#/"
            );
          } else {
            props.setServerMessage(data["message"]);
          }
        });
    }
  }, [props.APIDetailsLogin]);

  return <></>;
}

export default LoginAPI;
