import axios from "axios";

const API_URL = "https://fleet-tin-tongue-valentine.trycloudflare.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const getData = async (endpoint, params = {}) => {
  const response = await api.get(endpoint, { params });
  return response.data;
};

const postData = async (endpoint, params = {}) => {
  const response = await api.post(endpoint, params);
  return response.data;
};

const deleteData = async (endpoint, data = {}) => {
  const response = await api.delete(endpoint, {
    data: data,
  });
  return response.data;
};

const putData = async (endpoint, params = {}) => {
  const response = await api.put(endpoint, params);
  return response.data;
};

export { api, getData, postData, deleteData, putData };
