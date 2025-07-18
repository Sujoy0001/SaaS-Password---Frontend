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
  Cookies.set('authToken', token, { expires: 1 });
};

export const getToken = () => {
  return Cookies.get('authToken');
};

export const removeToken = () => {
  Cookies.remove('authToken');
  Cookies.remove('clientEmail');
  localStorage.removeItem('clientData');
  localStorage.removeItem('api_key');
  localStorage.removeItem('all_users');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const storeClientEmail = (email) => {
  Cookies.set('clientEmail', email, { expires: 1 });
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
    throw new Error(error.response?.data?.message || 'Failed to fetch client data. Please try again later.');
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

    const data = response.data;
    if (!Array.isArray(data) && !data?.users && !data?.data) {
      throw new Error('Unexpected response format from getAllUsers');
    }

    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to fetch users';
  }
};



export const deleteUser = async (userEmail) => {
  try {
    // Input validation
    if (!userEmail || typeof userEmail !== 'string') {
      throw new Error('Invalid user email - must be a string');
    }

    const api = getApi(); // Should return the api_key that matches {api_key} in route
    const token = getToken();
    if (!token) throw new Error('No auth token found');

    // Call DELETE route with user email as path parameter
    const response = await axios.delete(
      `${BASE_URL}/${api}/user/delete/${encodeURIComponent(userEmail)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    // Enhanced error handling matching FastAPI's response format
    const status = error.response?.status;
    const detail = error.response?.data?.detail || 
                  `Failed to delete user (${status || 'no status'})`;

    throw new Error(detail);
  }
};
