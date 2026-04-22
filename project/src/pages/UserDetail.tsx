import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteUser,
  fetchUser,
  selectUserById,
  selectUsersError,
  selectUsersLoading,
  updateUser,
} from "../store/slices/usersSlice";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) =>
    selectUserById(state, Number(id)),
  );
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const hasChanges = user ? name !== user.name || email !== user.email : false;
  const canSave = name.trim() && email.trim();

  useEffect(() => {
    if (!user && !loading && !error) dispatch(fetchUser(Number(id)));

    return () => {
      dispatch(clearError());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (user && !isEditing) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, isEditing]);

  const handleCancel = () => {
    if (!hasChanges || window.confirm("Отменить изменения?")) {
      setIsEditing(false);
      setName(user?.name || "");
      setEmail(user?.email || "");
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    if (window.confirm("Удалить пользователя?")) {
      try {
        await dispatch(deleteUser(user.id)).unwrap();
        navigate("/users");
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user) return;
    if (!hasChanges) return setIsEditing(false);

    if (window.confirm("Сохранить изменения?")) {
      try {
        await dispatch(updateUser({ ...user, name, email })).unwrap();
        setIsEditing(false);
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleBack = () => {
    if (
      hasChanges &&
      !window.confirm("У вас есть несохраненные изменения. Выйти?")
    )
      return;
    navigate(-1);
  };

  if (loading) return <Loading />;
  if (error) {
    return (
      <div>
        <h1>{error}</h1>
        <Link to="/users">К списку пользователей</Link>
      </div>
    );
  }

  return (
    <div className="container grid">
      <button className="button back" onClick={handleBack}>
        Назад
      </button>

      <h1>ID Пользователя: {user?.id}</h1>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
      </form>

      <div className="actions">
        {isEditing ? (
          <>
            <button className="button" onClick={handleSave} disabled={!canSave}>
              Сохранить
            </button>
            <button className="button" onClick={handleCancel}>
              Отменить
            </button>
          </>
        ) : (
          <>
            <button className="button" onClick={() => setIsEditing(true)}>
              Редактировать
            </button>
            <button
              className="button"
              onClick={handleDelete}
              disabled={loading}
            >
              Удалить
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
