import styles from './css/style.module.css'

export const Info = () =>{
  return(
    <div className={styles.Container}>
      <div className={styles.imageContainer}>
        <img src="assets/Pexels Photo by Mohammed Soufy.png" alt="" />
      </div>
      <div className={styles.Description}>
        <p>Something...</p>
      </div>
    </div>
  )
}

