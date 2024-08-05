import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import styles from '../css/style.module.css';
import { InputComponent } from '../../../components/Input';

export function StepSecond({ nextStep, prevStep, handleFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        handleFormData({ [name]: value });
    };

    return (
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
                    <InputComponent
                        label={'CEP'}
                        name={'cep'}
                        type={'text'}
                        placeholder={'Informe seu CEP'}
                        onChange={handleChange}
                    />
                    <InputComponent
                        label={'Estado'}
                        name={'state'}
                        type={'text'}
                        placeholder={'Qual o Estado'}
                        onChange={handleChange}
                    />
                </div>
                <InputComponent
                    label={'Cidade'}
                    name={'city'}
                    type={'text'}
                    placeholder={'Qual sua cidade'}
                    onChange={handleChange}
                />
                <InputComponent
                    label={'Endereço'}
                    name={'address'}
                    type={'text'}
                    placeholder={'Digite o nome de sua Rua'}
                    onChange={handleChange}
                />
                <div className={styles.button}>
                    <button onClick={() => nextStep('step3')} className={styles.submitButton}>
                        Continuar <ArrowRight size={24} color={'#111827'} />
                    </button>
                </div>
            </div>
        </>
    );
}
