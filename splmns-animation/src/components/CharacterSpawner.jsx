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

      setCharacters((prev) => {
        const inUseTypes = prev.map((c) => c.type);
        const availableTypes = characterTypes.filter(
          (type) => !inUseTypes.includes(type)
        );

        if (availableTypes.length === 0) return prev;

        const type =
          availableTypes[Math.floor(Math.random() * availableTypes.length)];

        const newCharacter = {
          id: crypto.randomUUID(),
          name,
          type,
        };

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
