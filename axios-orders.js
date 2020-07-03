import axios from "axios";
const instance = axios.create({
  baseURL: "https://react-my-burgur-18349.firebaseio.com/"
});
export default instance;
