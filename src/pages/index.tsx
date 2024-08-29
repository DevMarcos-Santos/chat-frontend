import { useState } from "react";

export const Index = () => {
  const [name, setName] = useState("");

  const handleLogin = () => {
    window.location.href = `chat/${name}`;
  };

  return (
    <div className="bg-zinc-900 h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-3xl mb-4">Digite seu nome:</h1>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="rounded  p-2"
          type="text"
        ></input>
        <button onClick={handleLogin} className="bg-emerald-700 w-32 p-2 rounded text-white font-bold mt-4">
          Entrar
        </button>
      </div>
    </div>
  );
};
