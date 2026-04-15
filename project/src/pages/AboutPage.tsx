import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>О нас</h2>
      <button onClick={() => navigate("/")}>На главную</button>
      <button onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};

export default AboutPage;
