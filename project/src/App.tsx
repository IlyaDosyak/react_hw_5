import "./App.css";
import Posts from "./components/Posts";
import Users from "./components/Users";

function App() {
  return (
    <>
      <div className="container">
        <Posts />
        <Users />
      </div>
    </>
  );
}

export default App;
