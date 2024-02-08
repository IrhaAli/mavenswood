import React, { useEffect } from "react";
import Cookies from "universal-cookie";

function SignUpAPI(props) {

  useEffect(() => {
    if (props.APIDetailsSignUp.user.length > 0) {
      const url = `https://ns1.youngtalentz.com/?rest_route=/simple-jwt-login/v1/users&email=${props.APIDetailsSignUp.email}&display_name=${props.APIDetailsSignUp.user}&password=${props.APIDetailsSignUp.pass}&AUTH_KEY=abc123`;
      fetch(url, {
        method: "POST",
      })
        .then((response) => response.json()) //json
        .then((data) => {
          if (data["success"]) {
            const cookies = new Cookies();
            cookies.set("jwt", data["jwt"]);
            cookies.set("name", data["user"]["display_name"]);
            cookies.set("email", data["user"]["user_email"]);
            window.location.replace("https://ns1.youngtalentz.com/apps/test_app/#/profile");
          } else {
            props.setServerMessage(data["data"]["message"]);
          }
        });
    }
  }, [props.APIDetailsSignUp]);

  return <></>;
}

export default SignUpAPI;
