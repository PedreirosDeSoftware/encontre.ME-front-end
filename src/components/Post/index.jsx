import UserIcon from '../UserIcon';
import styles from './css/style.module.css';
const Post = ({ creatorProfile, creatorName, location, description, image }) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
      <UserIcon avatarImage={creatorProfile} name={creatorName}/>
        <div className={styles.postInfo}>
          <p className={styles.profileName}>{creatorName}</p>
          <p className={styles.location}>{location}</p>
        </div>
      </div>
      
      {image && <div className={styles.imageContainer}> <img className={styles.postImage} src={image} alt={description} /></div>}
      <p className={styles.postDescription}>{description}</p>
      
      <div className={styles.postActions}>
        <button className={`${styles.button} ${styles.acheiButton}`}>Achei!</button>
        <button className={`${styles.button} ${styles.shareButton}`}>Share</button>
      </div>
    </div>
  );
}

export default Post;
