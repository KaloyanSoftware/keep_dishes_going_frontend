import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

//for sendign customer session cookie for basket consistency
axios.defaults.withCredentials = true;

export async function changeOrderStatus(orderId: string, status: string) {
    const response = await axios.patch(`/owner/orders/${orderId}`, {status: status});
    return response.data;
}