import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import {
  createTestUsers,
  fetchUsers,
  selectAllUsers,
  selectUsersError,
  selectUsersLoading,
} from "../store/slices/usersSlice";
import type { AppDispatch } from "../store/store";
import { useEffect } from "react";
import Error from "./Error";
import Loading from "./Loading";

const Users = () => {
  const users = useSelector(selectAllUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Loading />;

  if (error && !loading) return <Error>{error}</Error>;

  return (
    <div className="container grid">
      {!users?.length && (
        <button className="button" onClick={() => dispatch(createTestUsers())}>
          Создать тестовых пользователей
        </button>
      )}

      <ul className="users">
        {users.map((u) => (
          <User key={u.id} {...u} />
        ))}
      </ul>
    </div>
  );
};

export default Users;
