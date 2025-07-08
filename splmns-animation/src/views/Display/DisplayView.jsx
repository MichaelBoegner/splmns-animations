import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DisplayView() {
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const channel = new BroadcastChannel("name_channel");

    channel.onmessage = (event) => {
      const receivedName = event.data;
      if (typeof receivedName === "string") {
        setName(receivedName);
        localStorage.setItem("name", receivedName);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  return (
    <div className="display">
      <h1>Hello, {name || "stranger"}!</h1>
      <button onClick={() => navigate("/submit")} className="button-switch">
        Back
      </button>
    </div>
  );
}

export default DisplayView;
