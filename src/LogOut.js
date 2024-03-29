import React, { useEffect } from "react";
import Cookies from "universal-cookie";

// to get specific data: validate jwt and server side use that username to fetch data. Make sure key is needed to access enpoint.
function LogOut() {
  const cookies = new Cookies();

  useEffect(() => {
    cookies.remove("jwt");
    cookies.remove("name");
    cookies.remove("email");
    window.location.replace("https://ns1.youngtalentz.com/apps");
  }, []);

  return <></>;
}

export default LogOut;
