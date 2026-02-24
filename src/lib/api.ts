"use client";

// Using relative path so Vite proxy can handle the request
const BASE_URL = '/api';

const handleResponse = async (response: Response) => {
  const text = await response.text();
  let data = null;
  
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    console.error("Failed to parse JSON response:", text);
  }

  if (!response.ok) {
    throw new Error(data?.message || `Backend error: ${response.status}`);
  }
  return data;
};

export const api = {
  get: async (endpoint: string) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      return await handleResponse(response);
    } catch (error: any) {
      throw error;
    }
  },

  post: async (endpoint: string, body: any) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await handleResponse(response);
    } catch (error: any) {
      throw error;
    }
  },

  put: async (endpoint: string, body: any) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await handleResponse(response);
    } catch (error: any) {
      throw error;
    }
  },

  delete: async (endpoint: string) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const text = await response.text();
        let data = { message: "" };
        try {
          data = text ? JSON.parse(text) : { message: "" };
        } catch (e) {}
        throw new Error(data.message || `Backend error: ${response.status}`);
      }
      return true;
    } catch (error: any) {
      throw error;
    }
  },
};