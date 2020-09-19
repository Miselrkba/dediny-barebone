import React from "react";

export const TextContainer = ({ users }) => {
  return (
    <div>
      {users ? (
        <div className="aside aside-1">
          {" "}
          <h3>Používatelia v miestnosti:</h3>{" "}
          <h4>
            {users.map(({ name }) => (
              <div key={name}>{name}</div>
            ))}
          </h4>
        </div>
      ) : null}
    </div>
  );
};
