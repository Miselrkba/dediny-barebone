import React from "react";

export const InfoBar = ({ room }) => {
  return (
    <div>
      <div className="main-title-join">
        <h1>{room}</h1>
      </div>
      <button type="button" className="back-btn btn btn-light">
        <a className='text-secondary' href="/">Naspäť</a>
      </button>
    </div>
  );
};
