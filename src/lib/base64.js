// src/utils/base64.js
export const base64 = {
  // Encode string to base64
  encode: (str) => {
    try {
      return btoa(encodeURIComponent(str));
    } catch (error) {
      console.error('Base64 encode error:', error);
      return '';
    }
  },

  // Decode base64 to string
  decode: (str) => {
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch (error) {
      console.error('Base64 decode error:', error);
      return '';
    }
  }
};

// Optional: Add a function to handle special characters
/**
 * Utility object for safe Base64 encoding and decoding operations.
 * @namespace safeBase64
 * @property {function} encode - Encodes a string to URL-safe Base64 format
 * @property {function} decode - Decodes a URL-safe Base64 string back to original format
 */

/**
 * Encodes a string to URL-safe Base64 format
 * @function encode
 * @param {string} str - The string to encode
 * @returns {string} URL-safe Base64 encoded string with padding removed
 * @throws {Error} If encoding fails
 */

/**
 * Decodes a URL-safe Base64 string back to original format
 * @function decode
 * @param {string} str - The URL-safe Base64 string to decode
 * @returns {string} Decoded string in original format
 * @throws {Error} If decoding fails
 */
export const safeBase64 = {
  // Encode UTF-8 string to Base64 (URL-safe)
  encode: (str) => {
    try {
      return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode('0x' + p1)
        )
      )
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    } catch (error) {
      console.error('Safe base64 encode error:', error);
      return '';
    }
  },

  // Decode Base64 (URL-safe) back to UTF-8
  decode: (str) => {
    try {
      str = str.replace(/-/g, '+').replace(/_/g, '/');
      while (str.length % 4) str += '=';
      return decodeURIComponent(
        atob(str)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (error) {
      console.error('Safe base64 decode error:', error);
      return '';
    }
  },
};
