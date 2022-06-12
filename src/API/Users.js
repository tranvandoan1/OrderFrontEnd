import { axiosClient } from "./link.js";

const UserAPI = {
  signup(user) {
    const url = `/signup`;
    return axiosClient.post(url, user);
  },
  signin(user) {
    const url = `/signin`;
    return axiosClient.post(url, user);
  },
};
export default UserAPI;
