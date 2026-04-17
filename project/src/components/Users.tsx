import { useUsers } from "../hooks/useUsers";
import User from "./User";
// import { Link } from "react-router-dom";

const Users = () => {
  const { users, loading, error, deleteUser, updateUser } = useUsers();

  // const [name, setName] = useState<string>("");
  // const [email, setEmail] = useState<string>("");

  if (loading)
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  if (error)
    return (
      <div className="container">
        <h1>Error: {error}</h1>
      </div>
    );

  return (
    <div className="container grid">
      {/* <form className="form">
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
      </form> */}

      {/* <Link to={"/"} className="addButton">
        Добавить пользователя
      </Link> */}

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
