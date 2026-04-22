import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { PostType as Post } from "../../types";
import { postsApi } from "../../api/postsApi";
import type { RootState } from "../store";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// Получение всех постов
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (limit: number | void, { rejectWithValue }) => {
    try {
      return await postsApi.getPosts(limit ?? undefined);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Ошибка загрузки постов",
      );
    }
  },
);

// Получение поста по ID
export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id: number, { rejectWithValue }) => {
    try {
      return await postsApi.getPost(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Ошибка загрузки поста",
      );
    }
  },
);

// Добавление поста
export const addPost = createAsyncThunk(
  "posts/createPost",
  async (postData: Omit<Post, "id">, { rejectWithValue }) => {
    try {
      return await postsApi.addPost(postData);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Ошибка добавления поста",
      );
    }
  },
);

// Обновление поста
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: Post, { rejectWithValue }) => {
    try {
      return await postsApi.updatePost(post);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Ошибка обновления поста",
      );
    }
  },
);

// Удаление поста
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number, { rejectWithValue }) => {
    try {
      await postsApi.deletePost(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Ошибка удаления поста",
      );
    }
  },
);

// Создание тестовых постов
export const createTestPosts = createAsyncThunk(
  "posts/demo-data",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await postsApi.createTestPosts();
      dispatch(fetchPosts());
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Не удалось создать тестовые посты",
      );
    }
  },
);

// postsSlice
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      // fetchPost
      .addCase(fetchPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        } else {
          state.posts.push(action.payload);
        }
      })
      // addPost
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // updatePost
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.posts[index] = action.payload;
      })
      // deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearError } = postsSlice.actions;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectPostsById = (state: RootState, id: number) =>
  state.posts.posts.find((p) => p.id === id);
