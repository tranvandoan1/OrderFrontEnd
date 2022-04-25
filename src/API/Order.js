import { axiosClient } from "./link.js";
const OrderAPI = {
    getAll() {
        const url = `/order`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/order/${id}`;
        return axiosClient.get(url);
    },
    add(orders) {
        const url = `/order`;
        return axiosClient.post(url, orders);
    },
    remove(id) {
        const url = `/order/${id}`;
        return axiosClient.delete(url);
    },

};
export default OrderAPI;