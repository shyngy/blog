import React from 'react';
import { Pagination, Space, Spin } from 'antd';
import './App.css';
import Post from './components/Post';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  getFavorite,
  selectCurrentPage,
  selectPosts,
  selectPostsCount,
  setPage,
} from './store/postsSlice';
import { selectUser } from './store/userSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const postsCount = useAppSelector(selectPostsCount);
  const currentPage = useAppSelector(selectCurrentPage);
  const { username } = useAppSelector(selectUser);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    dispatch(getFavorite(setLoading));
  }, [currentPage, dispatch, username]);

  const onChangePagination = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className="App">
      <div className="center">
        {loading && (
          <Space className="spinner" size="large">
            <Spin size="large" />
          </Space>
        )}
        {posts && !loading && posts.map((post) => <Post key={post.slug} {...post} />)}
        {!loading && (
          <Pagination
            pageSize={5}
            onChange={onChangePagination}
            current={currentPage}
            total={postsCount}
            showSizeChanger={false}
          />
        )}
      </div>
    </div>
  );
};

export default App;
