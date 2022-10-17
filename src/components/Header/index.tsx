import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Avatar from '../Avatar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser, setUserData } from '../../store/userSlice';
import { getMe } from '../../api/auth';

const Header = () => {
  const user = useAppSelector(selectUser);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    setLoading(true);
    getMe()
      .then((res) => {
        dispatch(setUserData(res.user));
        setLoading(false);
      })
      .catch(() => {
        dispatch(setUserData({ email: '', username: '', image: '' }));
        document.cookie = 'token=; Max-Age=0';
        setLoading(false);
      });
  }, [user, dispatch]);

  const logout = () => {
    document.cookie = 'token=; Max-Age=0';
    dispatch(setUserData({ email: '', username: '', image: '' }));
  };
  return (
    <header className={styles.header}>
      <Link to="/">
        <h3>Realworld Blog</h3>
      </Link>
      <section className={styles.authSection}>
        {user.username && (
          <div className={styles.headerUser}>
            <Link to="/new-article">
              <button type="button" className={styles.createArticle}>
                Create article
              </button>
            </Link>
            <Link to="/profile">
              <Avatar imageUrl={user.image} name={user.username} />
            </Link>
            <button type="button" onClick={logout} className={styles.logout}>
              Log out
            </button>
          </div>
        )}
        {!user.username && !loading && (
          <>
            <Link tabIndex={-1} to="/sign-in">
              <button type="button">Sign in</button>
            </Link>

            <Link tabIndex={-1} to="/sign-up">
              <button type="button" className={styles.active}>
                Sign up
              </button>
            </Link>
          </>
        )}
      </section>
    </header>
  );
};
export default Header;
