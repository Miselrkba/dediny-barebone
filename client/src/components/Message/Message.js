import React from "react";


export const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim()

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer">
      <p className="sentText pr-10">{trimmedName}</p>
      <div>
        <p>{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer">
      <p className="sentText colorBrown pr-10">{user}</p>
      <div className="messageBox">
        <p className="messageText colorBrown">{text}</p>
      </div>
    </div>
  );
};
