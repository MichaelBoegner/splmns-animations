import { useState } from "react";

function SubmitView() {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const nameTrimmed = name.trim();
    if (!nameTrimmed) return;

    const names = JSON.parse(localStorage.getItem("names") || "[]");

    if (!names.includes(nameTrimmed)) {
      names.push(nameTrimmed);
      if (names.length > 5) names.shift();
      localStorage.setItem("names", JSON.stringify(names));
    }

    const channel = new BroadcastChannel("name_channel");
    channel.postMessage(nameTrimmed);
    channel.close();

    setName("");
  };

  return (
    <div className="submit">
      <h1>Enter Your Name</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="submit-input"
      />
      <button className="button-switch" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default SubmitView;
