import { callPostApi } from "./index";

// Register user api.
export const registerUser = async (data) => {
    try {
        const response = await callPostApi({ url: 'user/register', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Login user api.
export const loginUser = async (data) => {
    try {
        const response = await callPostApi({ url: 'user/login', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}