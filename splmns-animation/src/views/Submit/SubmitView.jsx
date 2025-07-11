import { useState } from "react";
import "./SubmitView.css";

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
    <div className="submit-view">
      <div className="submit-terminal">
        <h1>Rainy Days</h1>
        <p>
          Rainy Days is an effort to recreate the freedom, whimsy, and
          playfulness one experiences when playing in the rain.
          <br />
          <br />
          The piece was imagined by eccentric interactive artist Marlo Vens, a
          reclusive creative known for turning everyday phenomena into moments
          of personal magic. After a residency in northern Iceland where rain
          would fall for days on end, Marlo began recording the sound of puddle
          splashes, coding particle systems to mimic droplets, and sketching
          figures that looked like they were dancing just to stay warm.
          “Everyone’s soggy, but somehow smiling,” she wrote in her journal.
          <br />
          <br />
          Rainy Days is her digital homage to that feeling of being soaked,
          weightless, and unbothered.
          <br />
          <br />
          Enter your name or a short phrase below and watch as your avatar comes
          to life in the rain!
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder="Enter a name or a short phrase"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default SubmitView;
