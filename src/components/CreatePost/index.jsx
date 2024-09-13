import { Images, X, ArrowSquareIn } from '@phosphor-icons/react';
import { useState } from 'react';
import AccountIcon from '../AccountIcon';
import styles from './css/style.module.css';
import axios from 'axios';
import { UseAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const CreatePost = ({ accountAvatar, accountname }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className={styles.container}>
      <AccountIcon name={accountname} avatarImage={accountAvatar} />
      
      <button className={styles.button} onClick={() => setIsOpenModal(true)}>
        <div>
          publique quem desapareceu
          <span className={styles.icon}>
            <ArrowSquareIn size={18} />
          </span>
        </div>
      </button>

      {isOpenModal && <ModalCreatePost setIsOpenModal={setIsOpenModal} />}
    </div>
  );
};

function ModalCreatePost({ setIsOpenModal }) {
  const { account: token } = UseAuth(); // Obter o token do contexto de autenticação
  const [postContent, setPostContent] = useState(""); 
  const [selectedImage, setSelectedImage] = useState(null); 

  const handlePublish = async () => {
    if (!postContent.trim()) {
      alert("Por favor, digite o nome e informações relevantes.");
      return;
    }

    const formData = new FormData();
    formData.append('fullName', postContent);  // Assuming `postContent` is the full name
    formData.append('description', postContent);  // Add description if it's different
    formData.append('contact', '');  // Add a field for contact information, replace '' with actual data
  if (selectedImage) {
    formData.append('images', selectedImage);  // Append the image file
  }

    try {
      const authResponse = await axios.get("https://encontre-me-back-end.onrender.com/api/account/authorization", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!authResponse) {
        throw new Error("Unauthorized");
      }

      await axios.post(
        `https://encontre-me-back-end.onrender.com/api/account/${authResponse.data.authToken.id}/posts/create`,
        formData,  // Envia o formData com o conteúdo e a imagem
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',  // Define o tipo de conteúdo apropriado
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar o post:", error);
    }

    setIsOpenModal(false);
  };

  const handleUpload = (e) => {
    const image = e.target.files[0];
    if (image) {
      setSelectedImage(image);
      console.log("Imagem carregada:", image.name);
    }
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
        <div className={styles.preview}>
          {selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} alt="Preview da imagem carregada" className={styles.imagePreview} />
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.buttonSecondary}>
            <input 
              type='file' 
              name='Adicionar imagem' 
              onChange={handleUpload} 
              accept="image/*"
            />
            <Images size={24} weight='fill'/>
          </div>
          <button className={styles.buttonPrimary} onClick={handlePublish}>
            publicar
          </button>
        </div>
      </div>
    </div>
  );
}
