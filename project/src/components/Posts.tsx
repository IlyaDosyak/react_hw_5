import Post from "./Post";
import { useEffect, useState } from "react";
import {
  createTestPosts,
  fetchPosts,
  selectAllPosts,
  selectPostsError,
  selectPostsLoading,
} from "../store/slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import Error from "./Error";
import Loading from "./Loading";

const Posts = () => {
  const [limit, setLimit] = useState<number>(3);

  const posts = useSelector(selectAllPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts(limit));
  }, [dispatch, limit]);

  if (loading) return <Loading />;

  if (error) return <Error>{error}</Error>;

  return (
    <div className="container grid">
      {!posts?.length && (
        <button className="button" onClick={() => dispatch(createTestPosts())}>
          Создать тестовые посты
        </button>
      )}

      <ul>
        {posts.map((p) => (
          <Post key={p.id} {...p} />
        ))}
      </ul>

      {posts.length > 0 && (
        <button className="button" onClick={() => setLimit(limit + 1)}>
          Загрузить еще посты
        </button>
      )}
    </div>
  );
};

export default Posts;
