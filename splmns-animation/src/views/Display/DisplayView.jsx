import CharacterSpawner from "../../components/CharacterSpawner";
import RainOverlay from "../../components/RainOverlay";
import RainOverlay2 from "../../components/RainOverlay2";
import "./DisplayView.css";

function DisplayView() {
  return (
    <div className="display">
      <div className="rain-overlay-front">
        <RainOverlay />
      </div>
      <div className="character-spawner">
        <CharacterSpawner />
      </div>
      <div className="rain-overlay-back">
        <RainOverlay2 />
      </div>
    </div>
  );
}

export default DisplayView;
