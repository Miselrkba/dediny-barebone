import React from "react";

export const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="input">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Napíšte správu</span>
        </div>
        <textarea
          className="form-control"
          aria-label="Napíšte správu"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        ></textarea>
        <button
          type="button"
          className="btn btn-light"
          onClick={(e) => sendMessage(e)}
        >
          Poslať
        </button>
      </div>
    </form>
  );
};
