import { Images, X } from '@phosphor-icons/react'
import { useState } from 'react'
import styles from './css/style.module.css'

export function CreatePost(){

    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <div className={styles.container}>
            <img className={styles.profileImage} src='https://avatars.githubusercontent.com/u/64737334?v=4' alt='Ivandro Neto' />
            
            <button className={styles.button} onClick={() => setIsOpenModal(true)}>
                publique quem desapareceu
            </button>

            {isOpenModal && <ModalCreatePost setIsOpenModal={setIsOpenModal}/>}
            
        </div>
    )
}

 function ModalCreatePost({setIsOpenModal}){
    return (
        <div className={styles.containerModal}>
            <div className={styles.modal}>
                <div className={styles.head}>
                    <strong>Criar Post</strong>
                    <button onClick={() => setIsOpenModal(false)}>
                        <X size={24} color='#111827'/>
                    </button>
                </div>
                <textarea className={styles.textarea} placeholder='Digite aqui o nome de quem desapareceu e informações relevantes'/>
                <div className={styles.footer}>
                    <button className={styles.buttonSecondary}>
                        <Images size={24} weight='fill'/>
                        Adicionar imagem
                    </button>
                    <button className={styles.buttonPrimary}>
                        publicar
                    </button>
                </div>
            </div>
        </div>
    )
}