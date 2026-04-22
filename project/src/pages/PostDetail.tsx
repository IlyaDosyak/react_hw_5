import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
  clearError,
  deletePost,
  fetchPost,
  selectPostsById,
  selectPostsError,
  selectPostsLoading,
  updatePost,
} from "../store/slices/postsSlice";
import Loading from "../components/Loading";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const post = useSelector((state: RootState) =>
    selectPostsById(state, Number(id)),
  );
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const hasChanges = post
    ? title !== post.title || content !== post.content
    : false;
  const canSave = title.trim() && content.trim();

  useEffect(() => {
    if (!post && !loading && !error) dispatch(fetchPost(Number(id)));

    return () => {
      dispatch(clearError());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (post && !isEditing) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post, isEditing]);

  const handleCancel = () => {
    if (!hasChanges || window.confirm("Отменить изменения?")) {
      setIsEditing(false);
      setTitle(post?.title || "");
      setContent(post?.content || "");
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    if (window.confirm("Удалить пост?")) {
      try {
        await dispatch(deletePost(post.id)).unwrap();
        navigate("/posts");
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!post || !hasChanges) return setIsEditing(false);

    if (window.confirm("Сохранить изменения?")) {
      try {
        await dispatch(updatePost({ ...post, title, content })).unwrap();
        setIsEditing(false);
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleBack = () => {
    if (
      hasChanges &&
      !window.confirm("У вас есть несохраненные изменения. Выйти?")
    )
      return;
    navigate(-1);
  };

  if (loading) return <Loading />;
  if (error) {
    return (
      <div>
        <h1>{error}</h1>
        <Link to="/posts">К списку постов</Link>
      </div>
    );
  }

  return (
    <div className="container grid">
      <button className="button back" onClick={handleBack}>
        Назад
      </button>

      <h1>ID поста: {post?.id}</h1>
      
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="title">Заголовок:</label>
          <input
            type="text"
            id="title"
            value={title}
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label htmlFor="content">Текст:</label>
          <textarea
            id="content"
            value={content}
            autoComplete="off"
            onChange={(e) => setContent(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
      </form>

      <div className="actions">
        {isEditing ? (
          <>
            <button className="button" onClick={handleSave} disabled={!canSave}>
              Сохранить
            </button>
            <button className="button" onClick={handleCancel}>
              Отменить
            </button>
          </>
        ) : (
          <>
            <button className="button" onClick={handleEdit}>
              Редактировать
            </button>
            <button
              className="button"
              onClick={handleDelete}
              disabled={loading}
            >
              Удалить
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
