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
        <br />
        {content}
      </p>
      <div>
        <button onClick={() => updatePost(id, { title: "Обновленный пост" })}>
          Обновить
        </button>
        <button onClick={() => deletePost(id)}>Удалить</button>
      </div>
    </li>
  );
}

export default Post;
