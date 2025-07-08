import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DisplayView() {
  const [names, setNames] = useState(() => {
    return JSON.parse(localStorage.getItem("names") || "[]");
  });

  const navigate = useNavigate();

  useEffect(() => {
    const channel = new BroadcastChannel("name_channel");

    channel.onmessage = () => {
      const updated = JSON.parse(localStorage.getItem("names") || "[]");
      setNames(updated);
      console.log("Names updated via broadcast: ", updated);
    };

    return () => {
      channel.close();
    };
  }, []);

  return (
    <div className="display">
      <h1>Submitted Names</h1>
      {names.map((name, index) => (
        <div key={index}>
          <p>{name}</p>
          <div>Animation for {name}</div>
        </div>
      ))}
      <button onClick={() => navigate("/submit")} className="button-switch">
        Back
      </button>
    </div>
  );
}

export default DisplayView;
