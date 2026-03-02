// services/localStorage.service.js

/**
 * Stores a value in localStorage. Automatically stringifies non-string values.
 * @param {string} key - The key to store the value under.
 * @param {*} value - The value to store.
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving item to localStorage for key "${key}":`, error);
    // Optionally, you might want to throw the error or handle it more explicitly
    // depending on how critical localStorage operations are for your app.
  }
};

/**
 * Retrieves a value from localStorage. Automatically parses JSON strings.
 * @param {string} key - The key of the item to retrieve.
 * @returns {*} The retrieved value, or null if not found or an error occurs.
 */
export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    // If item is null or undefined, JSON.parse will throw an error,
    // so we handle it before parsing.
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading item from localStorage for key "${key}":`, error);
    return null; // Return null on error, similar to item not found
  }
};

/**
 * Removes an item from localStorage.
 * @param {string} key - The key of the item to remove.
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage for key "${key}":`, error);
  }
};

/**
 * Clears all items from localStorage. Use with caution.
 */
export const clearAll = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing all items from localStorage:", error);
  }
};