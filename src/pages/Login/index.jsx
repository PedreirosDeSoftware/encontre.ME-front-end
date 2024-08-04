import { Link, useNavigate } from 'react-router-dom';
import styles from './css/style.module.css';
import { InputComponent } from '../../components/Input';
import axios from 'axios';

function Login() {
  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  function handleAuth(){
    // const data = axios.post('')
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>
        <h1>Bem-vindo de volta</h1>
        <p>A sua ajuda pode fazer a diferença!</p>
      </div>
      
      <div className={styles.formContainer}>
        <form>
          <InputComponent label={'e-mail'} setValue={setEmail} name={'email'} type={'email'} placeholder={'Digite seu email'}/>

          <InputComponent label={'senha'} setValue={setPassword} name={'password'} type={'password'} placeholder={'Digite sua senha'}/>
        </form>
        
        <div className={styles.formSubmit}>
          <p>Novo por aqui? <Link to={'/register'}>Registre-se</Link></p>
          <button className={styles.submitButton} onClick={handleAuth}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
