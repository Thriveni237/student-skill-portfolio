"use client";

const BASE_URL = 'http://localhost:8082/api';

const handleResponse = async (response: Response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

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
      if (error.message.includes('Failed to fetch')) {
        throw new Error("Cannot connect to backend. Please ensure your Spring Boot app is running on port 8082.");
      }
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
      if (error.message.includes('Failed to fetch')) {
        throw new Error("Cannot connect to backend. Please ensure your Spring Boot app is running on port 8082.");
      }
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
      if (error.message.includes('Failed to fetch')) {
        throw new Error("Cannot connect to backend. Please ensure your Spring Boot app is running on port 8082.");
      }
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
        const data = text ? JSON.parse(text) : {};
        throw new Error(data.message || `Backend error: ${response.status}`);
      }
      return true;
    } catch (error: any) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error("Cannot connect to backend. Please ensure your Spring Boot app is running on port 8082.");
      }
      throw error;
    }
  },
};