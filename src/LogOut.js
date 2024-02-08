import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import Cookies from "universal-cookie";

// to get specific data: validate jwt and server side use that username to fetch data. Make sure key is needed to access enpoint.
function LogOut({ cookies }) {
  useEffect(() => {
    cookies.remove("jwt");
    cookies.remove("name");
    cookies.remove("email");
    window.location.replace("https://ns1.youngtalentz.com/apps/test_app");
  }, []);

  return <></>;
}

export default LogOut;
