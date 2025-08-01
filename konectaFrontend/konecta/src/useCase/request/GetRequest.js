import axios from "axios";
import { API_URL } from '../../../src/constants'
export const GetRequest = async (page, limit) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/get-request`, {
    paginacion: {
      page,
      limit
    }
  },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return response.data;
};
export const GetAllEmployees = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/get-all-employes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("que hay en response", response);
  return response.data;
};
