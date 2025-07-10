import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SubmitView from "./views/Submit/SubmitView";
import DisplayView from "./views/Display/DisplayView";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/submit" replace />} />
          <Route path="/submit" element={<SubmitView />} />
          <Route path="/display" element={<DisplayView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
