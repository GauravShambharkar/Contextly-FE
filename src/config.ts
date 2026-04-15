/**
 * API Configuration
 * 
 * This file handles the conditional API endpoints based on the environment.
 * Vite automatically handles .env files:
 * - .env.development is used during 'npm run dev'
 * - .env.production is used during 'npm run build'
 */

const API_BASE_URL = import.meta.env.VITE_POST_SUMMARIZE_API ||
  (import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/summarize'
    : 'https://contextly-api.onrender.com/summarize');


export const ENDPOINTS = {
  SUMMARIZE: API_BASE_URL,
};
