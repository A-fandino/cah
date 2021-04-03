import React from "react";
import { Link } from "react-router-dom";

export default function navBar() {
  return (
    <nav>
      <div className="left">
        <Link to="/">Home</Link>
        <Link to="/join">Join</Link>
      </div>
      <div className="right">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
