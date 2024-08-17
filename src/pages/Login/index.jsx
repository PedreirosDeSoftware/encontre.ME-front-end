import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './css/style.module.css';
import { InputComponent } from '../../components/Input';
import axios from 'axios';
import { UseAuth } from '../../context/AuthContext.jsx';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = UseAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:3333/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        login(response.data.token);
        navigate('/');
      } else {
        setError('Login falhou. Verifique suas credenciais e tente novamente.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Erro de rede. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>
        <h1>Bem-vindo de volta</h1>
        <p>A sua ajuda pode fazer a diferença!</p>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <InputComponent
            label="e-mail"
            name="email"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputComponent
            label="senha"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.formSubmit}>
            <p>Novo por aqui? <Link to="/register">Registre-se</Link></p>
            <button className={styles.submitButton} type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
