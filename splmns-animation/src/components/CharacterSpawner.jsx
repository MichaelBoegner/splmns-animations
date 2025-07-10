import { useEffect, useState } from "react";
import Character from "./Character";
import { characterTypes } from "../data/characterTypes";
import { generateMotionParams } from "../utils/generateAnimateParams";

function CharacterSpawner() {
  const [characters, setCharacters] = useState([]);
  const [_, setNames] = useState(() => {
    return JSON.parse(localStorage.getItem("names") || "[]");
  });

  useEffect(() => {
    const channel = new BroadcastChannel("name_channel");

    channel.onmessage = (e) => {
      const updated = JSON.parse(localStorage.getItem("names") || "[]");
      setNames(updated);
      console.log("Names updated via broadcast: ", updated);

      const name = e.data;
      const type =
        characterTypes[Math.floor(Math.random() * characterTypes.length)];

      const motionParams = generateMotionParams(type.movement);

      const newCharacter = {
        id: crypto.randomUUID(),
        name,
        type,
        motionParams,
      };

      setCharacters((prev) => {
        const updated = [...prev, newCharacter];
        return updated.slice(-5);
      });
    };

    return () => channel.close();
  }, []);

  return (
    <div className="character-spawner">
      {characters.map((char) => (
        <Character
          key={char.id}
          name={char.name}
          type={char.type}
          motionParams={char.motionParams}
        />
      ))}
    </div>
  );
}

export default CharacterSpawner;
