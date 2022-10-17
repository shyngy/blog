import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import styles from './Post.module.css';
import Avatar from '../Avatar';
import { Article } from '../../api/types';
import like from '../../assets/img/like.svg';
import liked from '../../assets/img/liked.svg';
import { deleteFavoriteArticle, favoriteArticle } from '../../api/post';
import { useAppDispatch } from '../../store/hooks';
import { setPostFavorite } from '../../store/postsSlice';

interface PostProps extends Article {
  children?: JSX.Element;
}

const Post: React.FC<PostProps> = ({
  title,
  favoritesCount,
  slug,
  description,
  tagList,
  author,
  createdAt,
  children,
  favorited,
}) => {
  const dispatch = useAppDispatch();
  const onClickLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (favorited) {
      deleteFavoriteArticle(slug).then((data) => {
        dispatch(setPostFavorite(data.article));
      });
    } else {
      favoriteArticle(slug).then((data) => {
        dispatch(setPostFavorite(data.article));
      });
    }
  };
  const tagComponent = (tag: Tag) => tag && tag !== ' ' && <span key={uuidv4()}>{tag}</span>;
  const body = (
    <>
      <header className={styles.header}>
        <h2>{title}</h2>
        <button type="button" onClick={onClickLike} className={styles.likeSection}>
          <img alt="like" src={favorited ? liked : like} />
          <span className={styles.likeCount}>{favoritesCount}</span>
        </button>
      </header>
      <div className={styles.avatarContainer}>
        <Avatar imageUrl={author.image} name={author.username} date={createdAt} />
      </div>
      <section className={styles.tags}>{tagList && tagList.slice(0, 7).map(tagComponent)}</section>
      <p className={styles.description}>{description}</p>
    </>
  );

  return (
    <article className={styles.post}>
      {!children && (
        <Link className={styles.link} to={`articles/${slug}`}>
          {body}
        </Link>
      )}
      {children && body}
      {children}
    </article>
  );
};

type Tag = string | null;

export default Post;
