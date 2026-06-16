import axios from "axios";

const API_URL = "http://localhost:3001/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor to handle 401 errors (Unauthorized)
api.interceptors.response.use((response) => response, (error) => {
    return Promise.reject(error);
});

// Auth API

export const authAPI = {
    register: (name, email, password) => api.post("/register", {name, email, password}),
    login: (email, password) => api.post("/login", {email, password}),
};

// Task API

export const taskAPI = {
    getAllTasks: () => api.get("/tasks"),
    createTask: (taskdata) => api.post("/tasks", taskdata),
    updateTask: (id, taskdata) => api.put(`/tasks/${id}`, taskdata),
    deleteTask: (id) => api.delete(`/tasks/${id}`),
}

// Product API

export const productAPI = {
    getAllProducts: () => api.get("/products"),
    getProductsbyId: (id) => api.get(`/products/${id}`),
    getProductsbyCategory: (category) => api.get(`/products?category=${category}`)
}

export default api;
