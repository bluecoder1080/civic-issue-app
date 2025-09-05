import axios from "axios";
import config from "./config";

// Build a robust base URL that works in dev (with proxy) and prod/static hosting
const baseURL = `${config.BACKEND_URL}${config.API_BASE_URL}`;

export default axios.create({
  baseURL,
});
