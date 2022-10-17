import React from 'react';
import { Spin, Space } from 'antd';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteArticle, getPostBySlug } from '../../api/post';
import Post from '../Post';
import styles from './FullPost.module.css';
import Modal from '../Modal';
import OutsideClick from '../OutsideClick';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/userSlice';
import { getFavorite, selectFullPost, setFullPost } from '../../store/postsSlice';

const FullPost = () => {
  const post = useAppSelector(selectFullPost);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const user = useAppSelector(selectUser);
  const params = useParams();
  const navigate = useNavigate();
  const slug = params.slug as string;
  React.useEffect(() => {
    getPostBySlug(slug).then((data) => {
      dispatch(setFullPost(data.article));
    });
  }, [slug, dispatch]);

  React.useEffect(() => {
    dispatch(getFavorite(setLoading));
  }, [user, dispatch]);

  const deletePost = () => {
    deleteArticle(slug)
      .then(() => {
        setOpen(false);
        navigate('/');
      })
      .catch((data) => {
        setError(data.response.data);
      });
  };

  const close = () => {
    setOpen(false);
    setError('');
  };
  if (loading) {
    return (
      <div className="center">
        <Space className="spinner" size="large">
          <Spin size="large" />
        </Space>
      </div>
    );
  }

  const modalBlock = (
    <div className={styles.modalPosition}>
      <Modal error={error} confirm={deletePost} open={open} close={close} />
    </div>
  );

  return (
    <div className="center">
      {post !== null && (
        <Post {...post}>
          <>
            {user.username === post.author.username && (
              <div className={styles.actions}>
                <button onClick={() => setOpen(true)} className={styles.deleteButton} type="button">
                  Delete
                </button>
                <OutsideClick onClickOutside={close} message={modalBlock} show={open} />
                <Link to="edit">
                  <button className={styles.editButton} type="button">
                    Edit
                  </button>
                </Link>
              </div>
            )}
            <div className={styles.markdown}>
              <ReactMarkdown children={post.body} />
            </div>
          </>
        </Post>
      )}
    </div>
  );
};

export default FullPost;
