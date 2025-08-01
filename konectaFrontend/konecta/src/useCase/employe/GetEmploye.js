import axios from "axios";
import { API_URL } from '../../../src/constants'
export const getPaginatedEmployees = async (page, limit) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/get-employes`, {
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
  console.log('data viene dis', response.data)
  return response.data;
};
