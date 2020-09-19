import React from "react";

export const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="input">
      <input
        type="text"
        placeholder="Napíšte správu"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <button onClick={(e) => sendMessage(e)}>Poslať</button>
    </form>
  );
};
