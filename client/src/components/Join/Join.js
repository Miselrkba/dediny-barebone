import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import '../../main.css'
import dediny from '../Helpers/dediny'
import besenova from '../../images/besenova.jpg'


const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  // nastav prvotnu miestnost
  useEffect(() => {
    setRoom("Ružomberok");
  }, []);

  return (
    <div className='join'>
      <h1>Dedinky</h1>
      <div>
      <img className='main-img' src={besenova} alt="besenova" />
      </div>
      <input placeholder="meno" onChange={(e) => setName(e.target.value)} />

      <label htmlFor="dediny">Vyberte si dedinu:</label>
      <select
        name="dediny"
        id="dediny"
        onChange={(e) => setRoom(e.target.value)}
      >
      {/* Mapuj cez dediny  */}
        {dediny.map((dedina) => (
          <option value={dedina} key={dedina}  >
            {dedina}
          </option>
        ))}
      </select>

      {/* Vstup do miestnosti */}
      <Link
        to={`/chat?name=${name}&room=${room}`}
        onClick={(e) => (!name || !room ? e.preventDefault() : null)}
      >
        <button disabled={name ? null : true} type="submit">Vstúpit</button>
      </Link>
    </div>
  );
};

export default Join;


