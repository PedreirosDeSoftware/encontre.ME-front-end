import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import styles from '../css/style.module.css';
import { InputComponent } from '../../../components/Input';

export function StepFirst({isUser, nextStep, prevStep}) {
    return(
        <>
            <div className={styles.title}>
                <button onClick={() => prevStep('default')} className={styles.x}>
                    <ArrowLeft size={24} color='#111827' />
                </button>
                <h1>Ficamos super felizes por se juntar a nós </h1>
                <p>Informe algumas informações sobre você</p>
            </div>
            <div className={styles.content}>
                <InputComponent label={'Nome'} name={'name'} type={'text'} placeholder={isUser ? 'Digite seu nome' : 'Digite o nome da instituição'}/>
                {!isUser && <InputComponent label={'Nome do dono'} name={'authorName'} type={'text'} placeholder={'Digite o nome do dono da instituição'}/>}
                
                <div className={styles.flexRow}>
                    <InputComponent label={'Numero'} name={'tel'} type={'tel'} placeholder={'Informe seu número de celular'}/>
                    <InputComponent label={isUser ? 'cpf' : 'cnpj' } name={'cpfOrCpnj'} type={'text'} placeholder={isUser ? 'Informe seu cpf' : 'Informe o cnpj'}/>
                </div>
            <div className={styles.button}>
                <button onClick={() => nextStep('step2')} className={styles.submitButton}>continuar <ArrowRight size={24} color={'#111827'}/></button>
            </div>
            </div>
        </>
    )
}