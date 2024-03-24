import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const navigate = useNavigate();

  function toHomepage() {
    navigate("/");
  }
  return (
    <div className="navBar">
      <div onClick={toHomepage} className="navBarText">
        NFTx.
      </div>
      <div className="navBarText">Hello {props.wallet}!</div>
    </div>
  );
}

export default NavBar;
