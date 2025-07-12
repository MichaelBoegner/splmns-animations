import { useEffect, useState } from "react";
import Character from "./Character";
import { characterTypes } from "../data/characterTypes";
import "./CharacterSpawner.css";

function CharacterSpawner() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const channel = new BroadcastChannel("name_channel");

    channel.onmessage = (e) => {
      const name = e.data;
      const type =
        characterTypes[Math.floor(Math.random() * characterTypes.length)];

      const newCharacter = {
        id: crypto.randomUUID(),
        name,
        type,
      };

      setCharacters((prev) => {
        const updated = [...prev, newCharacter];
        return updated.slice(-5);
      });
    };

    return () => channel.close();
  }, []);

  return (
    <div className="character-spawner-div">
      {characters.map((char) => (
        <Character key={char.id} name={char.name} type={char.type} />
      ))}
    </div>
  );
}

export default CharacterSpawner;
