import axios from "axios";
import { API_URL } from '../../../src/constants'
export const insertUser = async (form) => {
    const token = localStorage.getItem("token");
   await axios.post(`${API_URL}/insert-user`, {
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
