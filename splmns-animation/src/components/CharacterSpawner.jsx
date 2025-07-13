import { useEffect, useState } from "react";
import Character from "./Character";
import { characterTypes } from "../data/characterTypes";
import "./CharacterSpawner.css";

function CharacterSpawner() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const channel = new BroadcastChannel("name_channel");
    const maxCharacters = 5;

    channel.onmessage = (e) => {
      const name = e.data;

      setCharacters((prev) => {
        const trimmed = prev.length >= maxCharacters ? prev.slice(1) : prev;
        const inUseTypeIds = trimmed.map((c) => c.type.id);
        const availableTypes = characterTypes.filter(
          (type) => !inUseTypeIds.includes(type.id)
        );

        let type;
        let updated;

        if (availableTypes.length > 0) {
          type =
            availableTypes[Math.floor(Math.random() * availableTypes.length)];

          const newCharacter = {
            id: crypto.randomUUID(),
            name,
            type,
          };

          updated = [...trimmed, newCharacter];
        } else {
          const indexToReplace = Math.floor(Math.random() * trimmed.length);

          type = trimmed[indexToReplace].type;

          const newCharacter = {
            id: crypto.randomUUID(),
            name,
            type,
          };

          updated = [...trimmed];
          updated[indexToReplace] = newCharacter;
        }

        return updated;
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
