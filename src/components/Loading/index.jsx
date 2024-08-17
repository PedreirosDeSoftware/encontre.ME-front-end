import styles from './css/style.module.css'
export const Loading = () => {
  return(
    <div className={styles.container}>
    <div className={styles.ldsRipple}>
      <div></div>
      <div></div>
    </div>
    </div>
  )
}