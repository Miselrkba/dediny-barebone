import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../main.css";
import dediny from "../Helpers/dediny";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  // nastav prvotnu miestnost
  useEffect(() => {
    setRoom("Ružomberok");
  }, []);

  return (
    <div className="join">
      {/* Hlavicka a podtitul */}
      <h1 className="main-title">Dedinky</h1>
      <h3 className="main-subtitle">Chatujte so susedmi vo vašej dedine... </h3>
       {/* Vlozenie mena */}
      <div className="input-group-name mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
        </div>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Vaše meno"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      {/* vyber dediny */}
      <div className='label'>
        <h4 >Vyberte si dedinu:</h4>
        </div>
      <div className="select">
       
        <select
          name="dediny"
          id="dediny"
          onChange={(e) => setRoom(e.target.value)}
        >
          {/* Mapuj cez dediny  */}
          {dediny.map((dedina) => (
            <option value={dedina} key={dedina}>
              {dedina}
            </option>
          ))}
        </select>
      </div>

      {/* Vstup do miestnosti */}
      <Link
        className="enter-room"
        to={`/chat?name=${name}&room=${room}`}
        onClick={(e) => (!name || !room ? e.preventDefault() : null)}
        onKeyPress={(e) => (!name || !room ? e.preventDefault() : null)}
      >
        <button
          disabled={name ? null : true}
          type="submit"
          className="btn btn-secondary"
        >
          Vstúpiť
        </button>
      </Link>
    </div>
  );
};

export default Join;
