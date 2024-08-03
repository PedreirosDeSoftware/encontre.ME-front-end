import styles from './css/style.module.css';

const Short = ({ image, username }) => {
  return (
    <div className={styles.shortContainer}>
      <p className={styles.shortUserName}>{username}</p>
      <img src={image} alt={username} />
    </div>
  );
}

const Expanded = ({ image, username, location }) => {
  return (
    <div className={styles.expandedContainer}>
      <img src={image} alt={username} />
      <div className={styles.userInfo}>
        <p className={styles.expandedUserName}>{username}</p>
        <p className={styles.expandedLocation}>{location}</p>
      </div>
    </div>
  );
}

export default {
  Short,
  Expanded
};
