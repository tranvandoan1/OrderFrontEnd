import { axiosClient } from "./Axios.js";
const FloorAPI = {
    getAll() {
        const url = `/floor`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/floor/${id}`;
        return axiosClient.get(url);
    },
    upload(id, data) {
        const url = `/floor/${id}`;
        return axiosClient.put(url, data);
    },

};
export default FloorAPI;
export const remove = (id) => {
    const url = `/floor/${id}`;
    return axiosClient.delete(url);
}
export const addOder = (floor) => {
    const url = `/floor`;
    return axiosClient.post(url, floor);
}