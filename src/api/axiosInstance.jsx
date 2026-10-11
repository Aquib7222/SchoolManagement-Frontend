// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080",
// });

// // Attach JWT automatically
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Auto logout on unauthorized
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       localStorage.clear();
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: `http://${window.location.hostname}:8080`,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       localStorage.clear();
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       localStorage.clear();
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("➡️ API REQUEST:", config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(
      "✅ API RESPONSE:",
      response.config.method?.toUpperCase(),
      response.config.url,
      response.status
    );

    return response;
  },
  (error) => {
    console.error(
      "❌ API ERROR:",
      error.config?.method?.toUpperCase(),
      error.config?.url,
      "STATUS:",
      error.response?.status,
      "DATA:",
      error.response?.data
    );

    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {
      console.error(
        "🚨 AUTH ERROR — TOKEN WILL NOT BE CLEARED FOR DEBUGGING"
      );

      console.log(
        "Current token:",
        localStorage.getItem("token")
      );

      console.log(
        "Current user:",
        localStorage.getItem("user")
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;