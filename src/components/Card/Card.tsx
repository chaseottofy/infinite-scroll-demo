import styles from './Card.module.css';

const Card = ({ id, title, body }: { id: number, title: string, body: string; }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <p className={styles.circle} />
        </div>
        <div className={styles.username}>
          <p>Joe Smith</p>
          <span>·</span>
          <span>May 16</span>
        </div>
      </div>

      <div className={styles.body}>
        <h3>
          <span>
            {id}
            {'.) '}
          </span>
          {title}
        </h3>
        <p>{body}</p>
      </div>

      <div className={styles.footer}>
        <button className={styles.tag} type='button'>JavaSript</button>
        <span className={styles.minutes}>7 min read</span>
      </div>
    </div>
  );
};

export default Card;
