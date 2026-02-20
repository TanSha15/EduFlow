import api from "./axios";

export const generateContent = async (topic, type) => {
    const response = await api.post("/ai/generate", { topic, type });
    return response.data;
};

export const getStudyHistory = async () => {
    const response = await api.get("/ai/history"); 
    return response.data;
};

export const deleteStudyHistoryItem = async (id) => {
    const response = await api.delete(`/ai/history/${id}`);
    return response.data;
};