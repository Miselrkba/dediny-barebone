import React from "react";

export const InfoBar = ({ room }) => {
  return (
    <div>
      <div className="header">
        <h1>{room}</h1>
      </div>
      <div className='back-link'>
        <a href="/">naspäť</a>
      </div>
    </div>
  );
};
