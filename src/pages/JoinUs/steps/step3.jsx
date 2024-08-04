import { ArrowLeft } from '@phosphor-icons/react';
import styles from '../css/style.module.css';
import { InputComponent } from '../../../components/Input';
import { useNavigate } from 'react-router-dom';

export function StepTerceary({ prevStep }) {

    const navigate = useNavigate()
    function CreateAccont(){
        navigate('/')
    }

    return(
        <>
            <div className={styles.title}>
                <button onClick={() => prevStep('step2')} className={styles.x}>
                    <ArrowLeft size={24} color='#111827' />
                </button>
                <h1>Informe sua localização</h1>
                <p>Vamos achar quem precisar ser encontrada perto de sua localização</p>
            </div>
            <div className={styles.content}>
                <InputComponent label={'e-mail'} name={'email'} type={'email'} placeholder={'Digite seu email'}/>
                <InputComponent label={'senha'} name={'password'} type={'password'} placeholder={'Crie uma senha'}/>
                <InputComponent label={'confirme a senha'} name={'confirm_password'} type={'password'} placeholder={'confirme sua senha'}/>

            <div className={styles.button}> 
                <button onClick={CreateAccont} className={styles.submitButton}>Criar</button>
            </div>
            </div>
        </>
    )
}