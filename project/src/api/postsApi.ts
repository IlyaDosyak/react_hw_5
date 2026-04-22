import axios from "axios";
import type { PostType as Post } from "../types";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  auth: { username: "admin", password: "123" },
});

export const postsApi = {
  getPosts: async (limit?: number): Promise<Post[]> => {
    const res = await api.get<Post[]>(`/posts`, {
      params: limit ? { _limit: limit } : {},
    });
    return res.data;
  },

  getPost: async (id: number): Promise<Post> => {
    const res = await api.get<Post>(`/posts/${id}`);
    return res.data;
  },

  addPost: async (postData: Omit<Post, "id">): Promise<Post> => {
    const res = await api.post<Post>("/posts", postData);
    return res.data;
  },

  updatePost: async (post: Post): Promise<Post> => {
    const res = await api.put<Post>(`/posts/${post.id}`, post);
    return res.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },

  createTestPosts: async (): Promise<void> => {
    await api.post("/demo-data", {});
  },
};
