import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const registerClient = async (clientData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, clientData);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error.response?.data || error;
  }
};

export const loginClient = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
    const {  access_token, email } = response.data;
    storeToken(access_token);
    storeClientEmail(email);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data || error;
  }
};

export const storeToken = (token) => {
  console.log("Storing token:", token);
  Cookies.set('authToken', token, { expires: 7 });
};

export const getToken = () => {
  const token = Cookies.get('authToken');
  console.log("Retrieved token:", token);
  return token;
};

export const removeToken = () => {
  Cookies.remove('authToken');
  Cookies.remove('clientEmail');
  console.log("Removed token and client email from cookies.");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const storeClientEmail = (email) => {
  console.log("Storing client email:", email);
  Cookies.set('clientEmail', email, { expires: 7 });
};

export const getClientEmail = () => {
  const email = Cookies.get('clientEmail');
  console.log("Retrieved client email from cookies:", email);
  return email;
};

export const getClientByEmail = async () => {
  try {
    const clientEmail = getClientEmail(); // get email from cookies

    if (!clientEmail) {
      console.error("No client email found in cookies.");
      throw new Error('No client email found in cookies.');
    }

    const encodedEmail = encodeURIComponent(clientEmail);
    const url = `${BASE_URL}/clients/${encodedEmail}`;
    console.log('Fetching client by email:', url);

    const token = getToken();
    if (!token) {
      throw new Error('No auth token found. Please log in again.');
    }

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { api_key } = response.data;

    storeApi(api_key);

    return response.data;
  } catch (error) {
    console.error('Error fetching client data:', error.response || error.message);
    throw new Error('Failed to fetch client data. Please try again later.');
  }
};

export const storeApi = (api) => {
  Cookies.set('api_key', api);
}

export const getApi = () => {
  const api = Cookies.get('api_key')
  return api;
}

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
    console.error("Error fetching users:", error.response || error.message);
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
    console.error('Delete user error:', error.response || error.message);
    throw new Error(error.response?.data?.message || error.message || 'Failed to delete user');
  }
};
