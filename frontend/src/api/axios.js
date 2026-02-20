import axios from "axios";

const api = axios.create({
    baseURL: "https://eduflow-backend-ygz0.onrender.com",
    withCredentials: true, 
});

export default api;