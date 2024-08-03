import styles from './css/style.module.css';

function JoinUs() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.container}>
        <div className={styles.title}>
          <i className="ph ph-arrow-left"></i>
          <h1>Junte-se a nós!</h1>
          <p>Cada nova conexão pode trazer alguém de volta para casa.</p>
        </div>
        <div className={styles.containerIcons}>
          <div className={styles.icon1}>
            <div className={styles.iconPosition}>
              <i className="ph ph-building-office"></i>
              <h1>Instituição</h1>
              <p>Vamos ajudar a vida de outras pessoas juntos.</p>
            </div>
          </div>
          <div className={styles.icon2}>
            <div className={styles.iconPosition}>
              <i className="ph ph-user"></i>
              <h1>Usuário</h1>
              <p>Vamos encontrar seu(a) pessoa querida.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
