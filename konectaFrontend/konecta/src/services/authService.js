// src/services/authService.js
import axios from "axios";
import { API_URL } from "../constants";

export const loginRequest = async (email, password) => {
  const response = await axios.post(`${API_URL}/login-user`, {
    model: {email,
    password},
  });
  return response.data.token; 
};
