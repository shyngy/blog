import React from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  imageUrl: string;
  name: string;
  date?: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, name, date = '' }) => {
  const currentDate = new Date(date);
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('en-GB', {
    month: 'long',
  });
  const year = currentDate.getFullYear();
  return (
    <section className={styles.avatar}>
      <div className={styles.info}>
        <h6 className={styles.name}>{name}</h6>
        {date && <time className={styles.date}>{`${month} ${day}, ${year}`}</time>}
      </div>
      <img
        className={styles.img}
        src={
          imageUrl !== '' ? imageUrl : 'https://static.productionready.io/images/smiley-cyrus.jpg'
        }
        alt="avatar"
      />
    </section>
  );
};

export default Avatar;
