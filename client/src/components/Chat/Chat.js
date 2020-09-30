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
  const ENDPOINT = "https://dedinky.herokuapp.com/";

  
  useEffect(() => {
    // premenit na object a vybrat meno a miestnost s routera
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
    <div className="background-join">
      <InfoBar room={room} />
      <div className="users-and-messages">
        <TextContainer users={users} />{" "}
        <Messages messages={messages} name={name}></Messages>
      </div>
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};


export default Chat;

