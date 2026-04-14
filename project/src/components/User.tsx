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
        <br />({email})
      </p>
      <div>
        <button onClick={() => updateUser(id, { name: "NEW" })}>
          Обновить
        </button>
        <button onClick={() => deleteUser(id)}>Удалить</button>
      </div>
    </li>
  );
};

export default User;
