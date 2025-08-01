import axios from "axios";
import { API_URL } from '../../../src/constants'
export const insertRequest = async (form) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/insert-request`, {
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
    return response.data.data;
};
