export default function getUpdatedCharacters(
  prev,
  maxCharacters,
  characterTypes,
  name
) {
  const trimmed = prev.length >= maxCharacters ? prev.slice(1) : prev;
  const inUseTypeIds = trimmed.map((c) => c.type.id);
  const availableTypes = characterTypes.filter(
    (type) => !inUseTypeIds.includes(type.id)
  );

  let type;
  let updated;

  if (availableTypes.length > 0) {
    type = availableTypes[Math.floor(Math.random() * availableTypes.length)];

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
}
