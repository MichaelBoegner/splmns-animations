import CharacterSpawner from "../../components/CharacterSpawner";
import RainOverlay from "../../components/RainOverlay";

function DisplayView() {
  return (
    <div className="display">
      <RainOverlay />
      <CharacterSpawner />
    </div>
  );
}

export default DisplayView;
