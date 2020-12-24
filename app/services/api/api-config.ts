// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
const API_URL = "https://randomuser.me/api/?results=30&nat=us"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL || "https://jsonplaceholder.typicode.com",
  timeout: 10000,
}


// const APP_ID = '322838b8';
// const APP_KEY = '3dae99e916ff3c75084db6caa2856c83';


// const API_URL = "https://api.edamam.com/search?q=chicken&app_id=" + APP_ID + "&app_key=" + APP_KEY + "&from=0&to=3&calories=591-722&health=alcohol-free"