import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import User from "./User";

const Users = () => {
  const { users, loading, error, createUser, deleteUser, updateUser } =
    useUsers();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="column">
      <h2>Список Пользователей:</h2>
      <hr />

      <form className="form">
        <div>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="false"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            autoComplete="false"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            createUser({ name: name, email: email });
          }}
          disabled={!name || !email}
        >
          Добавить пользователя
        </button>
      </form>

      <ul className="users">
        {users.map((u) => (
          <User
            key={u.id}
            {...u}
            updateUser={updateUser}
            deleteUser={deleteUser}
          />
        ))}
      </ul>
    </div>
  );
};

export default Users;
