import axios from "axios";
import type { UserType } from "../types";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api/users";
const auth = { username: "admin", password: "123" };

export function useUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<UserType[]>(`${API_URL}`, {
        auth,
      })
      .then((res) => setUsers(res.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const getUser = async (id: number): Promise<UserType | null> => {
    try {
      const res = await axios.get<UserType>(`${API_URL}/${id}`, { auth });
      return res.data;
    } catch (err) {
      setError(`Ошибка получения пользователя: ${err}`);
      return null;
    }
  };

  const createUser = async (newUser: Omit<UserType, "id">) => {
    try {
      const res = await axios.post<UserType>(API_URL, newUser, { auth });
      setUsers((prev) => [...prev, res.data]);
    } catch (err) {
      setError(`Ошибка создания: ${err}`);
    }
  };

  const updateUser = async (id: number, data: Partial<UserType>) => {
    try {
      const res = await axios.put<UserType>(`${API_URL}/${id}`, data, { auth });
      setUsers((prev) => prev.map((u) => (u.id === id ? res.data : u)));
    } catch (err) {
      setError(`Ошибка обновления: ${err}`);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete<UserType>(`${API_URL}/${id}`, { auth });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(`Ошибка удаления: ${err}`);
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    getUser,
  };
}
