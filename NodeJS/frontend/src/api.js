import axios from "axios";

const API_URL = "http://localhost:5000/api/trees";

export const getTrees = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const addTree = async (formData) => {
    const res = await axios.post(`${API_URL}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
};

export const resetTrees = async () => {
    await axios.delete(`${API_URL}/reset`);
};
