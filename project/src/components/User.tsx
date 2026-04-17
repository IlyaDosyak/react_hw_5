import { Link } from "react-router-dom";
import type { UserType } from "../types";

const User = ({
  id,
  name,
  email,
  updateUser,
  deleteUser,
}: UserType & {
  updateUser: (id: number, data: any) => void;
  deleteUser: (id: number) => void;
}) => {
  return (
    <li>
      <p>
        {id}. {name}
      </p>

      <Link to={`/users/${id}`}>Подробнее</Link>
      {/* <button
          className="button"
          onClick={() => updateUser(id, { name: "NEW" })}
        >
          Редактировать
        </button>
        <button className="button" onClick={() => deleteUser(id)}>
          Удалить
        </button> */}
    </li>
  );
};

export default User;
