import React from "react";

export const Message = ({ message: { user, text }, name }) => {
  //check ci je sprava poslana aktualnym uzivatelom alebo adminom
  let isSentByCurrentUser = false;
  let isSentByAdmin = false;
  
  if (user === name) {
    isSentByCurrentUser = true;
  }
  if (user === 'admin') {
    isSentByAdmin = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer">
      <p className="sentText colorBlack">{user}</p>
      <div>
        <p className="colorOrange">{text}</p>
      </div>
    </div>
  ) : isSentByAdmin ? (
    <div className="messageContainer">
      <p className="sentText colorRed">{user}</p>
      <div className="messageBox">
        <p className="messageText colorRed">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer">
      <p className="sentText colorBlack">{user}</p>
      <div className="messageBox">
        <p className="messageText colorBlue">{text}</p>
      </div>
    </div>
  );
};
