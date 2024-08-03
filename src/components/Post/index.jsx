import styles from './css/style.module.css';

const Post = ({ creatorProfile, creatorName, location, description, image }) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <img className={styles.profileImage} src={creatorProfile} alt={creatorName} />
        <div className={styles.postInfo}>
          <p className={styles.profileName}>{creatorName}</p>
          <p className={styles.location}>{location}</p>
        </div>
      </div>
      <p className={styles.postDescription}>{description}</p>
      {image && <img className={styles.postImage} src={image} alt={description} />}
      <div className={styles.postActions}>
        <button className={`${styles.button} ${styles.acheiButton}`}>Achei!</button>
        <button className={`${styles.button} ${styles.shareButton}`}>Share</button>
      </div>
    </div>
  );
}

export default Post;
