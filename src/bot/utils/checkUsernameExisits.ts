import axios from "axios";

/**
 * Check if a username exists in the backend.
 * @param {string} username - The username to check.
 * @returns {Promise<boolean>} - Returns true if the username exists, false otherwise.
 */
export const checkUsernameExisits = async (
  backend: string,
  username: string
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${backend}/api/users/check-username/${username}`
    );
    return response.data.exists;
  } catch {
    return false;
  }
};
