import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { UserType as User } from "../../types";
import { usersApi } from "../../api/usersApi";
import type { RootState } from "../store";

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// Получение всех пользователей
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await usersApi.getUsers();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Ошибка загрузки пользователей",
      );
    }
  },
);

// Получение пользователя по ID
export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (id: number, { rejectWithValue }) => {
    try {
      return await usersApi.getUser(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Ошибка загрузки пользователя",
      );
    }
  },
);

// Добавление пользователя
export const addUser = createAsyncThunk(
  "users/createUser",
  async (userData: Omit<User, "id">, { rejectWithValue }) => {
    try {
      return await usersApi.addUser(userData);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Ошибка добавления пользователя",
      );
    }
  },
);

// Обновление пользователя
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: User, { rejectWithValue }) => {
    try {
      return await usersApi.updateUser(user);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Ошибка обновления пользователей",
      );
    }
  },
);

// Удаление пользователя
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await usersApi.deleteUser(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Ошибка удаления пользователей",
      );
    }
  },
);

// Создание тестовых пользователей
export const createTestUsers = createAsyncThunk(
  "users/demo-users",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await usersApi.createTestUsers();
      dispatch(fetchUsers());
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail ||
          "Не удалось создать тестовых пользователей",
      );
    }
  },
);

// usersSlice
export const usersSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUsers
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      // fetchUser
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        } else {
          state.users.push(action.payload);
        }
      })
      // addUser
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      // updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id,
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      // deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u.id !== action.payload);
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

export const { clearError } = usersSlice.actions;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectUserById = (state: RootState, id: number) =>
  state.users.users.find((u) => u.id === id);
