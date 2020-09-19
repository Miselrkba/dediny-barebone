import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import { TextContainer } from "../TextContainer/TextContainer";
import { Messages } from "../Messages/Messages";
import { InfoBar } from "../InfoBar/InfoBar";
import { Input } from "../Input/Input";

import "../../main.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    // posli vstupne udaje - meno a miestnost
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  // ked pride sprava zober vsetky spravy + novu spravu
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    // ukaz uzivatelov v miestnosti - cakanie z backendu

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  // posielanie sprav
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <TextContainer users={users} />

        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        <Messages messages={messages} name={name} />
      </div>
    </div>
  );
};

export default Chat;
