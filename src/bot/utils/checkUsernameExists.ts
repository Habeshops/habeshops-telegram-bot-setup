import axios from "axios";

// Local cache for usernames
const existingUsersCache: Set<string> = new Set();

/**
 * Check if a username exists in the backend, with local caching.
 * @param {string} backend - The backend URL.
 * @param {string} username - The username to check.
 * @returns {Promise<boolean>} - Returns true if the username exists, false otherwise.
 */
export const checkUsernameExists = async (
  backend: string,
  username: string
): Promise<boolean> => {
  if (existingUsersCache.has(username)) {
    return true;
  }

  try {
    const response = await axios.get(
      `${backend}/api/users/check-username/${username}`
    );

    if (response.data.exists) {
      existingUsersCache.add(username);
    }

    return response.data.exists;
  } catch (error) {
    console.error(`Error checking username existence for ${username}:`, error);
    return false;
  }
};
