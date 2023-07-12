import axios from 'axios';

// object with back end base url
const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// GET request
export const Get = async (url) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

// POST request
export const Post = async (url, data) => {
    try {
        const response = await api.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

// Put request
export const Put = async (url, data) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

// Delete request
export const Delete = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
