import { ArrowLeft } from '@phosphor-icons/react';
import styles from '../css/style.module.css';
import { InputComponent } from '../../../components/Input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function StepTerceary({ prevStep, handleFormData, formData, onSubmit }) {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Handling change for ${name} with value: ${value}`); // Debugging
    handleFormData({ [name]: value });
  };

  const handlePassConfirmedChange = (e) => {
    const { value } = e.target;
    console.log(`Confirm password input: ${value}`); // Debugging
    setConfirmed(value);
  };

  const handleSubmit = async () => {
    if (formData.password !== confirmed) {
      alert("Passwords do not match");
      return;
    }
    await onSubmit();
    navigate('/');
  };

  return (
    <>
      <div className={styles.title}>
        <button onClick={() => prevStep('step2')} className={styles.x}>
          <ArrowLeft size={24} color='#111827' />
        </button>
        <h1>Finalize o cadastro</h1>
        <p>Crie uma conta para finalizar o cadastro</p>
      </div>
      <div className={styles.content}>
        <InputComponent
          label={'E-mail'}
          name={'email'}
          type={'email'}
          placeholder={'Digite seu email'}
          onChange={handleChange}
        />
        <InputComponent
          label={'Senha'}
          name={'password'}
          type={'password'}
          placeholder={'Crie uma senha'}
          onChange={handleChange}
        />
        <InputComponent
          label={'Confirme a senha'}
          name={'confirm_password'}
          type={'password'}
          placeholder={'Confirme sua senha'}
          onChange={handlePassConfirmedChange}
        />
        <div className={styles.button}>
          <button onClick={handleSubmit} className={styles.submitButton}>
            Criar Conta
          </button>
        </div>
      </div>
    </>
  );
}
