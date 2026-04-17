import Post from "./Post";
import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
// import { Link } from "react-router-dom";

const Posts = () => {
  const [limit, setLimit] = useState<number>(3);

  const { posts, loading, error, updatePost, deletePost } = usePosts(limit);

  // const [title, setTitle] = useState<string>("");
  // const [content, setContent] = useState<string>("");

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
          <label htmlFor="title">Заголовок:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="false"
          />
        </div>

        <div>
          <label htmlFor="content">Текст:</label>
          <input
            type="text"
            name="content"
            id="content"
            value={content}
            autoComplete="false"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            createPost({ title: title, content: content });
          }}
          disabled={!title || !content}
        >
          Добавить пост
        </button>
      </form> */}

      {/* <Link to={"/"}>Добавить пост</Link> */}
      <ul>
        {posts.map((p) => (
          <Post
            key={p.id}
            {...p}
            updatePost={updatePost}
            deletePost={deletePost}
          />
        ))}
      </ul>

      <button onClick={() => setLimit(limit + 1)}>Загрузить еще посты</button>
    </div>
  );
};

export default Posts;
