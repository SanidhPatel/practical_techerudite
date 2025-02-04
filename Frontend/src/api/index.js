import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const callPostApi = async ({ url, body }) => {
    const result = await axios({
        url: API_URL + url,
        method: "POST",
        data: body,
        timeout: 120000
    });
    return result;
}