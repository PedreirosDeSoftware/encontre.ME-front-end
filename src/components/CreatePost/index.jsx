import { Images, X } from '@phosphor-icons/react';
import { useState } from 'react';
import styles from './css/style.module.css';

export const CreatePost = ({ userAvatar = "", username = "" }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className={styles.container}>
      <img className={styles.profileImage} src={userAvatar} alt={username} />
      
      <button className={styles.button} onClick={() => setIsOpenModal(true)}>
        publique quem desapareceu
      </button>

      {isOpenModal && <ModalCreatePost setIsOpenModal={setIsOpenModal} />}
    </div>
  );
};

function ModalCreatePost({ setIsOpenModal }) {
  const [postContent, setPostContent] = useState(""); // State to handle textarea content
  const [selectedImage, setSelectedImage] = useState(null); // State to handle image upload

  const handlePublish = () => {
    // Add validation here before publishing the post
    if (!postContent.trim()) {
      alert("Por favor, digite o nome e informações relevantes.");
      return;
    }

    // Handle post submission logic here

    // Close the modal after submission
    setIsOpenModal(false);
  };

  return (
    <div className={styles.containerModal}>
      <div className={styles.modal}>
        <div className={styles.head}>
          <strong>Criar Post</strong>
          <button onClick={() => setIsOpenModal(false)}>
            <X size={24} color='#111827'/>
          </button>
        </div>
        <textarea
          className={styles.textarea}
          placeholder='Digite aqui o nome de quem desapareceu e informações relevantes'
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <div className={styles.footer}>
          <button className={styles.buttonSecondary} onClick={() => {/* Handle image upload logic here */}}>
            <Images size={24} weight='fill'/>
            Adicionar imagem
          </button>
          <button className={styles.buttonPrimary} onClick={handlePublish}>
            publicar
          </button>
        </div>
      </div>
    </div>
  );
}
