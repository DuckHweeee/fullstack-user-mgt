import axios from "axios";
import { User, UserFormData } from "@/types/user";

const API_URL = "http://localhost:8080/api/v1/users";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "Accept": "application/json; charset=UTF-8"
  },
  withCredentials: true,
});

export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const { data } = await api.get("");
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  },

  async getUserById(id: number): Promise<User> {
    try {
      const { data } = await api.get(`/${id}`);
      return data;
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      throw error;
    }
  },

  async createUser(user: UserFormData): Promise<User> {
    try {
      const { data } = await api.post("", user);
      return data;
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  },

  async updateUser(id: number, user: UserFormData): Promise<User> {
    try {
      const { data } = await api.put(`/${id}`, user);
      return data;
    } catch (error) {
      console.error(`Failed to update user ${id}:`, error);
      throw error;
    }
  },

  async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      console.error(`Failed to delete user ${id}:`, error);
      throw error;
    }
  },
};
