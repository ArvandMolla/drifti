import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://data.brreg.no/enhetsregisteret/api/",
});
export default axiosInstance;
