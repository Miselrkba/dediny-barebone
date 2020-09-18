const users = [];

const addUser = ({ id, name, room }) => {
  // odstranenie whitespace
  name = name.trim()
  room = room.trim()

  // check ci je uzivatelske meno uz pouzite
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room)
    return {
      error: "Prosím zadajte meno a dedinu",
    };

  if (existingUser)
    return {
      error: "Meno je už zadané",
    };

  // zober id meno dedinu potlac do users a vrat
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  // najdi pouzivatela s tym id a vrat jeho index a odstran z users
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};


//zober id, najdi a vrat uzivatela
const getUser = (id) => users.find((user) => user.id === id);

//zobraz pouzivatelov v dedine
const getUsersInRoom = (room) => users.filter((user) => user.room === room);


module.exports = { addUser, removeUser, getUser, getUsersInRoom };
