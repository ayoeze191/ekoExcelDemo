import axios from "axios";

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000", // Base URL for all requests
  baseURL: "https://dark-rickie-ezekielsteam-b13c1bb2.koyeb.app/",

  headers: {
    "Content-Type": "application/json", // Default headers
  },
  maxBodyLength: Infinity, // Optional: For large payloads
});

// Example of making a POST request using the instance
const login = async () => {
  const data = JSON.stringify({
    email: "ayoeze191@gmail.com",
    password: "75739768jc",
  });
};

// Export the Axios instance for reuse
export { axiosInstance, login };
