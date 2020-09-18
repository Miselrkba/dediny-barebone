import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const dediny = [
  "Ružomberok",
  "Hubová",
  "Ivachnová",
  "Kalameny",
  "Komjatná",
  "Likavka",
  "Liptovská Lúžna",
  "Liptovská Osada",
  "Liptovská Štiavnica",
  "Liptovská Teplá",
  " Liptovské Revúce",
  " Liptovské Sliače",
  " Liptovský Michal",
  "Lisková",
  "Ľubochňa",
  "Lúčky",
  "Ludrová",
  " Martinček",
  "Potok",
  "Stankovany",
  "Štiavnička",
  "Švošov",
  "Turík",
  " Valaská Dubová",
];

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  // nastav prvotnu miestnost
  useEffect(() => {
    setRoom("Ružomberok");
    console.log('useEffect');
  }, []);

  

  return (
    <div>
      <h1>Dedinky</h1>
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
