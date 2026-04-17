import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container grid">
      <h1>Главная страница</h1>
      <div className="links">
        <Link to="/users">Пользователи</Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  );
};

export default HomePage;
