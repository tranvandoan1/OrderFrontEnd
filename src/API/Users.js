import { axiosClient } from "./link.js";

const UserAPI = {
    getAll() {
        const url = `/user`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },
    signup(user) {
        const url = `/signup`;
        return axiosClient.post(url, user);
    },
    signin(user) {
        const url = `/signin`;
        return axiosClient.post(url, user);
    },
    remove(id) {
        const url = `/user/${id}`;
        return axiosClient.delete(url);
    },
    upload(id, data) {
        const url = `/user/${id}`;
        return axiosClient.put(url, data);
    },
};
export default UserAPI;