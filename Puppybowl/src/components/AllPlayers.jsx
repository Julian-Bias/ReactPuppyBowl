import React, { useEffect, useState } from "react";
import { fetchAllPlayers, deletePlayer } from "../API";
import { useNavigate } from "react-router-dom";
import NewPlayerForm from "./NewPlayerForm";
import "./CommonStyles.css";

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const navigate = useNavigate();

  const getAllPlayers = async () => {
    const APIResponse = await fetchAllPlayers();
    if (APIResponse.success) {
      setPlayers(APIResponse.data.players);
    } else {
      setError(APIResponse.error.message);
    }
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  const playersToDisplay = searchParams
    ? players.filter((player) =>
        player.name.toLowerCase().includes(searchParams)
      )
    : players;

  const handlePlayerClick = (playerId) => {
    navigate(`/player/${playerId}`);
  };

  const handleDeletePlayer = async (playerId) => {
    const APIResponse = await deletePlayer(playerId);
    if (APIResponse.success) {
      setPlayers(players.filter((player) => player.id !== playerId));
    } else {
      setError(APIResponse.error.message);
    }
  };

  return (
    <>
      <NewPlayerForm onPlayerAdded={getAllPlayers} />
  
      <div className="players-container">
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
          />
        </label>
      </div>
  
      {error && <div className="error-message">Error: {error}</div>}
      <div>
        {playersToDisplay.map((player) => (
          <div key={player.id} className="player-card">
            <h3>{player.name}</h3>
            <button onClick={() => handlePlayerClick(player.id)}>
              See Details
            </button>
            <button onClick={() => handleDeletePlayer(player.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllPlayers;
