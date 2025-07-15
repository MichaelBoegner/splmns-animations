import { useEffect, useState } from "react";
import Character from "./Character";
import getUpdatedCharacters from "../utils/characterUtils";
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
        const updated = getUpdatedCharacters(
          prev,
          maxCharacters,
          characterTypes,
          name
        );

        const exiting = updated.filter((c) => c.isExiting);
        exiting.forEach((char) => {
          setTimeout(() => {
            setCharacters((curr) => curr.filter((c) => c.id !== char.id));
          }, 500);
        });

        return updated;
      });
    };

    return () => channel.close();
  }, []);

  return (
    <div className="character-spawner-div">
      {characters.map((char) => (
        <Character
          key={char.id}
          name={char.name}
          type={char.type}
          isExiting={char.isExiting}
        />
      ))}
    </div>
  );
}

export default CharacterSpawner;
