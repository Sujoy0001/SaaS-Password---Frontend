import axios from 'axios';

const API_BASE_URL = 'https://saas-password.onrender.com';

// ✅ Register a new client and store token + email
export const registerClient = async (clientData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, clientData);
    
    const { token, email } = response.data;
    storeToken(token);
    storeClientEmail(email);
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ✅ Login client and store token + email
export const loginClient = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
    
    const { token, email } = response.data;
    storeToken(token);
    storeClientEmail(email);
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ✅ Store token in localStorage
export const storeToken = (token) => {
  localStorage.setItem('authToken', token);
};

// ✅ Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// ✅ Remove token and client email (logout)
export const removeToken = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('clientEmail');
};

// ✅ Check if user is authenticated (token exists)
export const isAuthenticated = () => {
  return !!getToken();
};

// ✅ Store client email in localStorage
export const storeClientEmail = (email) => {
  localStorage.setItem('clientEmail', email);
};

// ✅ Get client email from localStorage
export const getClientEmail = () => {
  return localStorage.getItem('clientEmail');
};

export const getClientByEmail = async (email) => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/clients/${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

