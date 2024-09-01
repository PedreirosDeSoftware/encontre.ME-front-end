import styles from './css/style.module.css';
import AccountIcon from "../AccountIcon"
const Short = ({ image, accountname }) => {
  return (
    <div className={styles.shortContainer}>
      <p className={styles.shortAccountName}>{accountname}</p>
      <AccountIcon name={accountname} avatarImage={image}/>
    </div>
  );
}

const Expanded = ({ image, accountname, location }) => {
  return (
    <div className={styles.expandedContainer}>
      <AccountIcon name={accountname} avatarImage={image}/>
      <div className={styles.accountInfo}>
        <p className={styles.expandedAccountName}>{accountname}</p>
        <p className={styles.expandedLocation}>{location}</p>
      </div>
    </div>
  );
}

export default {
  Short,
  Expanded
};
