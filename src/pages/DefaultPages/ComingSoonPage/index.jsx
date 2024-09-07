import { useNavigate } from 'react-router-dom';
import styles from './css/style.module.css';

function ComingSoonPage() {
  const navigate = useNavigate()
  return(
    <div className={styles.container}>
        <h1>Opa! Parece que você está perdido...🥲</h1>
        <p>Vamos ajudar você a regressar para página inicial.</p>
        <button onClick={() => navigate('/feed')}>
          <p>Regressar agora</p>
        </button>
    </div>
  );
}

export default ComingSoonPage;