import styles from './css/style.module.css'

export function CreatePost(){
    return (
        <div className={styles.container}>
            <img className={styles.profileImage} src='https://avatars.githubusercontent.com/u/64737334?v=4' alt='Ivandro Neto' />
            
            <button className={styles.button}>
                publique quem desapareceu
            </button>
        </div>
    )
}