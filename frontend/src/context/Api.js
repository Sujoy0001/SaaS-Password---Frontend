// src/api.js
import axios from "axios";
import { getClientEmail } from "./Auth";


export const getClientByEmail = async () => {
  try {
    const email = getClientEmail(); // Call your function to get email

    if (!email) {
      throw new Error("Email is not available from Auth.");
    }

    console.log("Fetching client data for email:", email); // For debugging

    // const response = await axios.get(`${BASE_URL}/clients/${encodeURIComponent(email)}`);
    const response = await axios.get('http://127.0.0.1:8000/clients/dd%40gmail.com');

    console.log("API Response:", response.data); // For debugging

    return response.data;
  } catch (error) {
    console.error("Error fetching client by email:", error.response || error.message);
    throw error;
  }
}



export const getAllUsers = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/3164d614b899f498a66f7abe8485c4fc/user/all');
    console.log("Fetched users:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response || error.message);
    throw error;
  }
};




export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete('http://127.0.0.1:8000/3164d614b899f498a66f7abe8485c4fc/user/delete/${userId}', {
      headers: {
        'Content-Type': 'application/json',
        // Add if using authentication:
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Delete successful:', response.data);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || 
                   error.message || 
                   'Failed to delete user';
    console.error("Delete error details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: errorMsg
    });
    throw new Error(errorMsg);
  }
};