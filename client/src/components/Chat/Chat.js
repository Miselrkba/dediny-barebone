import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { InfoBar } from "../InfoBar/InfoBar";
import { Input } from "../Input/Input";
import { Messages } from "../Messages/Messages";
import { TextContainer } from "../TextContainer/TextContainer";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('')

  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // posli vstupne udaje - meno a miestnost
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // ked pride sprava zober vsetky spravy + novu spravu
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    // ukaz uzivatelov v miestnosti - cakanie z backendu
    socket.on('roomData', ({users}) => {
        setUsers(users)
    })
  }, [messages]);

  // posielanie sprav
  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  
  return (
    <div>
        <TextContainer users={users} />
      <div>
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <InfoBar room={room} />
      <Messages messages={messages} name={name} />
    </div>
  );
};

export default Chat;

// testing