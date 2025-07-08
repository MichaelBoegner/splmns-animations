import CharacterSpawner from "../../components/CharacterSpawner";
import RainOverlay from "../../components/RainOverlay";
import "./DisplayView.css";

function DisplayView() {
  return (
    <div>
      <RainOverlay />
      <CharacterSpawner />
      <div className="ground-line" />
    </div>
  );
}

export default DisplayView;
