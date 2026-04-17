import { Link, useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import type { UserType } from "../types";
import { useEffect, useState } from "react";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const { getUser } = useUsers();

  useEffect(() => {
    getUser(Number(id)).then((data) => setUser(data));
  }, []);

  if (!user)
    return (
      <div className="container">
        <h1>Пользователь не найден</h1>
        <Link to="/users">К списку пользователей</Link>
      </div>
    );

  return (
    <div className="container grid">
      <button className="backButton" onClick={() => navigate(-1)}>
        Назад
      </button>

      <h1>ID Пользователя: {user.id}</h1>
      <h2>Имя: {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserDetail;
