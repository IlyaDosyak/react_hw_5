import axios from "axios";
import type { UserType as User } from "../types";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  auth: { username: "admin", password: "123" },
});

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    const res = await api.get<User[]>("/users");
    return res.data;
  },

  getUser: async (id: number): Promise<User> => {
    const res = await api.get<User>(`/users/${id}`);
    return res.data;
  },

  addUser: async (userData: Omit<User, "id">): Promise<User> => {
    const res = await api.post<User>("/users", userData);
    return res.data;
  },

  updateUser: async (user: User): Promise<User> => {
    const res = await api.put<User>(`/users/${user.id}`, user);
    return res.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  createTestUsers: async (): Promise<void> => {
    await api.post("/demo-users", {});
  },
};
