import { Link } from "react-router-dom";
import type { PostType } from "../types";

function Post({
  id,
  title,
  content,
  updatePost,
  deletePost,
}: PostType & {
  updatePost: (id: number, data: any) => void;
  deletePost: (id: number) => void;
}) {
  return (
    <li>
      <p>
        {id}. {title}
      </p>

      <Link to={`/posts/${id}`}>Подробнее</Link>
      {/* <button onClick={() => updatePost(id, { title: "Обновленный пост" })}>
          Обновить
        </button>
        <button onClick={() => deletePost(id)}>Удалить</button> */}
    </li>
  );
}

export default Post;
