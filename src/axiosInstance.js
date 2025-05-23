import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});




api.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => {
    console.log("hi from success axios");
    return response;
  },
  (error) => {
    console.log("axios error:", error.message);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
     const errorMessage = error.response?.data?.message || 
                        error.message || 
                        "Network Error";
    return Promise.reject(new Error(errorMessage));
  }
);


export default api;
