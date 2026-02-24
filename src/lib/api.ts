"use client";

const BASE_URL = 'http://localhost:8082/api';

export const api = {
  get: async (endpoint: string) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Backend error: ${response.status}`);
      }
      return response.json();
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
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Backend error: ${response.status}`);
      }
      return response.json();
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
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Backend error: ${response.status}`);
      }
      return response.json();
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Backend error: ${response.status}`);
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