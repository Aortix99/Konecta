import axios from "axios";
import { API_URL } from '../../../src/constants'
export const InsertEmployees = async (form) => {
  console.log('quien es form', form);
  const token = localStorage.getItem("token");
  await axios.post(`${API_URL}/insert-employes`, {
    model: {
      ...form
    }
  },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
};
