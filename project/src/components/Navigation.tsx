import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="nav">
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/users">Пользователи</NavLink>
      <NavLink to="/posts">Посты</NavLink>
    </nav>
  );
};

export default Navigation;
