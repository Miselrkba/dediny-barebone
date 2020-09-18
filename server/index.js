const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    // ak je uz tento uzivatel existuje vrat chybu
    if (error) return callback(error);

    // vstupit do miestnosti
    socket.join(user.room);

    // posli privitaciu spravu
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, vitaj v dedine ${user.room}`,
    });

    // ohlas kazdemu v miestnosti kto vstupil
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name}, vstúpil do miestnosti`,
    });

    // ukaz uzivatelov v miestnosti
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    // spusti prazdny callback zakazdym
    // ak je chyba zobraz chybu hore
    callback();

    console.log(name, room);
  });

  // cakanie na spravy od uzivatela. callback sa spusti po poslani
  // socket.emit('message')
  socket.on("sendMessage", (message, callback) => {
    // zobrat id uzivatela
    const user = getUser(socket.id);
    // ist do miestnosti a posle spravu od uzivatela
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  // odstranit uzivatela ked sa odpoji
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    // posli spravu ostatnym ked sa uzivatel odpoji
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} odišiel z miestnosti`,
      });
      // updatuj uzivatelov v miestnosti
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server je spusteny na porte ${PORT}`));
