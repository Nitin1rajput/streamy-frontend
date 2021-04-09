import React from "react";
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth";
const header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        <h3>Streamy</h3>
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <Auth />
      </div>
    </div>
  );
};

export default header;
