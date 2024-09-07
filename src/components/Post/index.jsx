import axios from 'axios';
import AccountIcon from '../AccountIcon';
import styles from './css/style.module.css';
import { UseAuth } from '../../context/AuthContext';

const Post = ({ creatorProfile, creatorName, location, description, image, editable=false }) => {
  
  const handleDeletePost = async (postId) => {
   // deletar o Post
   console.log("On next update...")
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <div className={styles.userInfoContainer}>
        <AccountIcon avatarImage={creatorProfile} name={creatorName}/>
        <div className={styles.postInfo}>
          <p className={styles.profileName}>{creatorName}</p>
          <p className={styles.location}>{location}</p>
        </div>
        </div>
        <button className={`${styles.alert} ${styles.button} ${editable === true? '': styles.desactived}`}>
          Delete
        </button>
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
