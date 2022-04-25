import { axiosClient } from "./link.js";
const OrderDetailAPI = {
    getAll() {
        const url = `/orderdetail`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/orderdetail/${id}`;
        return axiosClient.get(url);
    },
    add(orderdetail) {
        const url = `/orderdetail`;
        return axiosClient.post(url, orderdetail);
    },
    remove(id) {
        const url = `/orderdetail/${id}`;
        return axiosClient.delete(url);
    },


};
export default OrderDetailAPI;