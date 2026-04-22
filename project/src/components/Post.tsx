import { Link } from "react-router-dom";
import type { PostType } from "../types";

function Post({ id, title }: PostType) {
  return (
    <li>
      <p>
        {id}. {title}
      </p>

      <Link to={`/posts/${id}`}>Подробнее</Link>
    </li>
  );
}

export default Post;
