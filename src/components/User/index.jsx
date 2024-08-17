import styles from './css/style.module.css';
import UserIcon from "../UserIcon"
const Short = ({ image, username }) => {
  return (
    <div className={styles.shortContainer}>
      <p className={styles.shortUserName}>{username}</p>
      <UserIcon name={username} avatarImage={image}/>
    </div>
  );
}

const Expanded = ({ image, username, location }) => {
  return (
    <div className={styles.expandedContainer}>
      <UserIcon name={username} avatarImage={image}/>
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
