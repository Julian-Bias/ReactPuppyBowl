const COHORT = "2407-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT}`;

export async function fetchAllPlayers() {
  try {
    const response = await fetch(`${API_URL}/players`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addPlayer(playerData) {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error adding player:", error);
  }
}

export async function deletePlayer(playerId) {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`, {
      method: "DELETE",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting player:", error);
  }
}

export const fetchPlayerById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/players/${id}`);
    const result = await response.json();

    // Log the entire result to debug
    console.log("API Response:", result);

    // Check if the data contains the player directly
    if (result.success) {
      return { success: true, data: result.data };  // Return the player data directly
    } else {
      return { success: false, error: result.error || "Player not found" };  // Handle error
    }
  } catch (error) {
    console.error("Error fetching player by ID:", error);
    return { success: false, error: error.message };  // Handle errors
  }
};
