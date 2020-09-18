import React from "react";

export const TextContainer = ({ users }) => {
  return (
    <div>
      {users ? (
        <div>
          {" "}
          <h1>Používatelia v miestnosti:</h1>{" "}
          <h2>
            {users.map(({ name }) => (
              <div key={name}>{name}</div>
            ))}
          </h2>
        </div>
      ) : null}
    </div>
  );
};
