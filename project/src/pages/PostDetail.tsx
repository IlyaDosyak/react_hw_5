import { Link, useNavigate, useParams } from "react-router-dom";

import type { PostType } from "../types";
import { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostType | null>(null);
  const { getPost } = usePosts();

  useEffect(() => {
    getPost(Number(id)).then((data) => setPost(data));
  }, []);

  if (!post)
    return (
      <div className="container">
        <h1>Пост не найден</h1>
        <Link to="/posts">К списку постов</Link>
      </div>
    );

  return (
    <div className="container grid">
      <button className="backButton" onClick={() => navigate(-1)}>
        Назад
      </button>

      <h1>ID поста: {post.id}</h1>
      <h2>Заголовок: {post.title}</h2>
      <p>Текст: {post.content}</p>
    </div>
  );
};

export default PostDetail;
