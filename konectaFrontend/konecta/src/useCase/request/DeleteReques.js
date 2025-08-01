import axios from "axios";
import { API_URL } from '../../../src/constants'
export const deleteItem = async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/delete-request`, {
        model: {
            id
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
