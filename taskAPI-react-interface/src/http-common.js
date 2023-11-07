import axios from "axios";
function getToken(){

  const user =  JSON.parse(localStorage.getItem("user"))
  console.log(user);
  if(user) return user.token
  else return ""
}

export const http =  axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json"
  }
})

http.interceptors.request.use(
  (config) => {
    const token = getToken()
    const auth = token ? `Bearer ${token}` : '';
    config.headers.common['Authorization'] = auth;
    return config;
  },
  (error) => Promise.reject(error),
);