import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import styles from '../css/style.module.css';
import { InputComponent } from '../../../components/Input';

export function StepSecond({nextStep, prevStep}) {
    return(
        <>
            <div className={styles.title}>
                <button onClick={() => prevStep('step1')} className={styles.x}>
                    <ArrowLeft size={24} color='#111827' />
                </button>
                <h1>Informe sua localização</h1>
                <p>Vamos achar quem precisar ser encontrada perto de sua localização</p>
            </div>
            <div className={styles.content}>
                <div className={styles.flexRow}>
                    <InputComponent label={'CEP'} name={'cep'} type={'text'} placeholder={'Informe seu CEP'}/>
                    <InputComponent label={'Estado'} name={'state'} type={'text'} placeholder={'Qual o Estado'}/>
                </div>
                    <InputComponent label={'Cidade'} name={'city'} type={'text'} placeholder={'Qual sua cidade'}/>
                    <InputComponent label={'Endereço'} name={'adress'} type={'text'} placeholder={'Digite o nome de sua Rua'}/>
            <div className={styles.button}> 
                <button onClick={() => nextStep('step3')} className={styles.submitButton}>continuar <ArrowRight size={24} color={'#111827'}/></button>
            </div>
            </div>
        </>
    )
}