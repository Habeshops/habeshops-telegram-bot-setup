import axios from "axios";

// Local cache for banned users
const bannedUsersCache: Set<string> = new Set();

/**
 * Check if a user is banned, with local caching to minimize backend calls.
 * @param {string} backend - The backend URL.
 * @param {string} username - The username to check.
 * @returns {Promise<boolean>} - Returns true if the user is banned, false otherwise.
 */
export const checkIfTheUserIsBanned = async (
  backend: string,
  username: string
): Promise<boolean> => {
  if (bannedUsersCache.has(username)) {
    return true;
  }

  try {
    const response = await axios.get(
      `${backend}/api/users/check-ban/${username}`
    );

    if (response.data.ban) {
      bannedUsersCache.add(username);
    }

    return response.data.ban;
  } catch (error) {
    console.error(`Error checking ban status for ${username}:`, error);
    return false;
  }
};
