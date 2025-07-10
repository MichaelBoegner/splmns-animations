import CharacterSpawner from "../../components/CharacterSpawner";
import RainOverlay from "../../components/RainOverlay";
import "./DisplayView.css";

function DisplayView() {
  return (
    <div className="aspect-ratio">
      <div className="display">
        <div className="rain-overlay-front">
          <RainOverlay />
        </div>
        <div className="character-spawner">
          <CharacterSpawner />
        </div>
        <div className="rain-overlay-back">
          <RainOverlay />
        </div>
      </div>
    </div>
  );
}

export default DisplayView;
