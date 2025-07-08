import { useNavigate } from "react-router-dom";
import CharacterSpawner from "../../components/CharacterSpawner";

function DisplayView() {
  const navigate = useNavigate();

  return (
    <div className="display">
      <CharacterSpawner />
      <button onClick={() => navigate("/submit")} className="button-switch">
        Back
      </button>
    </div>
  );
}

export default DisplayView;
