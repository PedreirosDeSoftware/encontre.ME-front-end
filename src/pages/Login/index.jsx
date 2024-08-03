import styles from './css/style.module.css';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>
        <h1>Bem-vindo de volta</h1>
        <h3>A sua ajuda pode fazer a diferença!</h3>
      </div>
      
      <div className={styles.formContainer}>
        <form>
          <label htmlFor="email">e-mail</label>
          <input type="email" id="email" className={styles.inputEmail} placeholder="Digite seu email" />
          
          <label htmlFor="senha">senha</label>
          <input type="password" id="senha" className={styles.inputPassword} placeholder="Senha" />
        </form>
        
        <div className={styles.formSubmit}>
          <p>Novo por aqui? <a href="#">Registre-se</a></p>
          <button className={styles.submitButton}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
