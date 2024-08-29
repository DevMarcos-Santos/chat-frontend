import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import { v4 as uuidv4 } from "uuid";
interface Message {
  id: string;
  name: string;
  text: string;
}

interface Payload {
  name: string;
  text: string;
}

const sokect = io("http://localhost:3000");

export const Home = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { name } = useParams();

  useEffect(() => {
    const receivedMessage = (message: Payload) => {
      const newMessage: Message = {
        id: uuidv4(),
        name: message.name,
        text: message.text,
      };

      setMessages([...messages, newMessage]);
    };

    sokect.on("msgToClient", (message: Payload) => {
      receivedMessage(message);
    });
  }, [messages, name, text]);

  const sendMessage = () => {
    const message: Payload = {
      name: name as string,
      text: text,
    };
    sokect.emit("msgToServer", message);
    setText("");
  };

  return (
    <div className="bg-zinc-950 h-screen overflow-auto flex justify-center items-center">
      <div className="bg-zinc-800 w-[500px] h-auto rounded p-5">
        <div className="bg-zinc-700  rounded-md container messages p-5">
          <div className="w-full ">
            {messages.map((item) => (
              <>
                {item.name == name ? (
                  <div
                    key={item.id}
                    className="w-full flex items-end justify-end"
                  >
                    <div className="bg-green-600 text-white w-auto p-1 rounded-md mt-4">
                      <p>{item.text}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <label className="user">{item.name} diz: </label>
                    <div key={item.id}>
                      <p className="bg-slate-600 text-white w-max p-1 rounded-md">
                        {item.text}
                      </p>
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="message flex flex-row">
          <input
            type="text"
            className="w-full p-2 h-10 mt-5 bg-zinc-950 rounded text-white"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <button
            onClick={sendMessage}
            className="w-20 ml-5 text-white font-bold bg-emerald-700 h-10 rounded-md mt-5"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
