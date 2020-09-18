import React from "react";

export const InfoBar = ({ room }) => {
  return (
    <div>
      <div>
        <h3>{room}</h3>
      </div>
      <div>
        <a href="/">naspäť</a>
      </div>
    </div>
  );
};
