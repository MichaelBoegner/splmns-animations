export default function getUpdatedCharacters(
  prev,
  maxCharacters,
  characterTypes,
  name
) {
  const updated = [...prev];
  let exitingType = null;

  if (updated.length >= maxCharacters) {
    const idx = updated.findIndex((c) => !c.isExiting);
    if (idx !== -1) {
      updated[idx] = { ...updated[idx], isExiting: true };
      exitingType = updated[idx].type;
    }
  }

  const inUseTypeIds = updated.map((c) => c.type.id);
  const baseAvailableTypes = characterTypes.filter(
    (type) => !inUseTypeIds.includes(type.id)
  );
  const availableTypes = exitingType
    ? [...baseAvailableTypes, exitingType].filter(
        (type, index, self) => self.findIndex((t) => t.id === type.id) === index
      )
    : baseAvailableTypes;

  let type;

  if (availableTypes.length > 0) {
    type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
  } else {
    const candidates = updated.filter((c) => !c.isExiting);
    const indexToReplace = updated.indexOf(
      candidates[Math.floor(Math.random() * candidates.length)]
    );

    if (indexToReplace !== -1) {
      const replaced = { ...updated[indexToReplace], isExiting: true };
      updated[indexToReplace] = replaced;
      type = replaced.type;
    }
  }

  if (!type) {
    type = characterTypes[Math.floor(Math.random() * characterTypes.length)];
  }

  const newCharacter = {
    id: crypto.randomUUID(),
    name,
    type,
    isExiting: false,
  };

  updated.push(newCharacter);
  return updated;
}
