import { Link } from "react-router-dom";
import type { UserType } from "../types";

const User = ({ id, name }: UserType) => {
  return (
    <li>
      <p>
        {id}. {name}
      </p>

      <Link to={`/users/${id}`}>Подробнее</Link>
    </li>
  );
};

export default User;
