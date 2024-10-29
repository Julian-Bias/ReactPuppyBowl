import React, { useState } from "react";
import { addPlayer } from "../API";


const NewPlayerForm = ({ onPlayerAdded }) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlayer = {
      name,
      breed,
      imageUrl,
    };

    try {
      const response = await addPlayer(newPlayer);

      if (response && response.success) {
        setSuccessMessage("Player added successfully!");
        onPlayerAdded();
        setName("");
        setBreed("");
        setImageUrl("");
      } else {
        setError("Failed to add player.");
      }
    } catch (error) {
      setError("Error adding player.");
    }
  };

  return (
    <div>
      <h2>Add a New Player</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Breed: </label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL: </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Player</button>
      </form>

      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default NewPlayerForm;