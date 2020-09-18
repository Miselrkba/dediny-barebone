import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div>
      <h1>Dedinky</h1>
      <input placeholder='meno' onChange={(e) => setName(e.target.value)} />
      <input placeholder='dedina' onChange={(e) => setRoom(e.target.value)} />
      <Link
        to={`/chat?name=${name}&room=${room}`}
        onClick={(e) => (!name || !room ? e.preventDefault() : null)}
      >
        <button type="submit">Vstúpit</button>
      </Link>
    </div>
  );
};

export default Join;
