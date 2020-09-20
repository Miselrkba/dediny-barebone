import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";

export const TextContainer = ({ users }) => {
  return (
    <div>
      {users ? (
        <div className="users-sidebar">
          {" "}
          <h5>Používatelia :</h5>{" "}
          <h6>
            {users.map(({ name }) => (
              <div key={name}>
                <img className='icon' alt="Online Icon" src={onlineIcon} />
                {name}
                
              </div>
            ))}
          </h6>
        </div>
      ) : null}
    </div>
  );
};
