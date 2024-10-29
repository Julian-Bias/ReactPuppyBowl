import React from "react";
import { Routes, Route } from "react-router-dom";
import AllPlayers from "./components/AllPlayers";
import SinglePlayer from "./components/SinglePlayer";

function App() {
  return (
    <div>
      <h1>Puppy Bowl</h1>
      <Routes>
        <Route path="/" element={<AllPlayers />} />
        <Route path="/player/:id" element={<SinglePlayer />} />  {/* Route for single player */}
      </Routes>
    </div>
  );
}

export default App;