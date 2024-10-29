import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPlayerById } from "../API";
import "./CommonStyles.css";

const SinglePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayer = async () => {
      try {
        setLoading(true);
        const response = await fetchPlayerById(parseInt(id, 10)); // Ensure ID is an integer
        console.log("Fetched Player Response:", response); // Log the response for debugging

        // Check if the API response is successful
        if (response.success) {
          // Directly set player data as it is no longer nested in players array
          setPlayer(response.data.player);
        } else {
          // Log the error returned from the API
          console.error("Error fetching player data:", response.error);
          setError(response.error || "Player not found");
        }
      } catch (error) {
        console.error("Error fetching player data:", error);
        setError("Error fetching player data");
      } finally {
        setLoading(false);
      }
    };

    getPlayer();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!player) {
    return <div>No player data available</div>;
  }

  return (
    <div className="single-player-container">
      <div className="single-player-card">
        <h2>{player.name}</h2>
        <img src={player.imageUrl} alt={player.name} />
        <p>Breed: {player.breed}</p>
        <button onClick={() => navigate("/")}>Back to List</button>
      </div>
    </div>
  );
};

export default SinglePlayer;
