import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const registerClient = async (clientData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, clientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const loginClient = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
    const { access_token, email } = response.data;
    storeToken(access_token);
    storeClientEmail(email);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const storeToken = (token) => {
  Cookies.set('authToken', token, { expires: 7 });
};

export const getToken = () => {
  return Cookies.get('authToken');
};

export const removeToken = () => {
  Cookies.remove('authToken');
  Cookies.remove('clientEmail');
  localStorage.removeItem('clientData');
  localStorage.removeItem('api_key');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const storeClientEmail = (email) => {
  Cookies.set('clientEmail', email, { expires: 7 });
};

export const getClientEmail = () => {
  return Cookies.get('clientEmail');
};

export const getClientByEmail = async () => {
  try {
    const cachedData = localStorage.getItem('clientData');
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const clientEmail = getClientEmail();
    if (!clientEmail) {
      throw new Error('No client email found in cookies.');
    }

    const encodedEmail = encodeURIComponent(clientEmail);
    const url = `${BASE_URL}/clients/${encodedEmail}`;

    const token = getToken();
    if (!token) {
      throw new Error('No auth token found. Please log in again.');
    }

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { api_key } = response.data;

    storeApi(api_key);
    localStorage.setItem('clientData', JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch client data. Please try again later.');
  }
};

export const storeApi = (api) => {
  localStorage.setItem('api_key', api);
};

export const getApi = () => {
  return localStorage.getItem('api_key');
};

export const getAllUsers = async () => {
  try {
    const api = getApi();
    const token = getToken();
    if (!token) throw new Error('No auth token found.');

    const response = await axios.get(`${BASE_URL}/${api}/user/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const api = getApi();
    const token = getToken();
    if (!token) throw new Error('No auth token found.');

    const response = await axios.delete(`${BASE_URL}/${api}/user/delete/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to delete user');
  }
};
