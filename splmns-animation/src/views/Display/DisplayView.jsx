import { useNavigate } from "react-router-dom";
import CharacterSpawner from "../../components/CharacterSpawner";
import RainOverlay from "../../components/RainOverlay";

function DisplayView() {
  const navigate = useNavigate();

  return (
    <div className="display">
      <RainOverlay />
      <CharacterSpawner />
      <button onClick={() => navigate("/submit")} className="button-switch">
        Back
      </button>
    </div>
  );
}

export default DisplayView;
