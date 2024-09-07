import { useEffect, useState } from 'react'
import styles from './css/style.module.css'

export const ErrorPopup = ({content, show}) =>{

  return(
    <div className={`${styles.error} ${styles.card} ${show === false ? styles.hide : styles.show}`}>
     <p>{content}</p>
    </div>
  )
}

export const SuccessPopUp = ({content}) =>{
  return(
    <div className={`${styles.success} ${styles.card}`}>
      <p>{content}</p>
    </div>
  )
}