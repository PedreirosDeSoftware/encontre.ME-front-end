import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import styles from '../css/style.module.css';
import { InputComponent } from '../../../components/Input';

export function StepFirst({ isAccount, nextStep, prevStep, handleFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        handleFormData({ [name]: value });
    };

    return (
        <>
            <div className={styles.title}>
                <button onClick={() => prevStep('default')} className={styles.x}>
                    <ArrowLeft size={24} color='#111827' />
                </button>
                <h1>Ficamos super felizes por se juntar a nós</h1>
                <p>Informe algumas informações sobre você</p>
            </div>
            <div className={styles.content}>
                <InputComponent
                    label={'Nome'}
                    name={'name'}
                    type={'text'}
                    placeholder={isAccount ? 'Digite seu nome' : 'Digite o nome da instituição'}
                    onChange={handleChange}
                />
                {!isAccount && (
                    <InputComponent
                        label={'Nome do dono'}
                        name={'authorName'}
                        type={'text'}
                        placeholder={'Digite o nome do dono da instituição'}
                        onChange={handleChange}
                    />
                )}
                <div className={styles.flexRow}>
                    <InputComponent
                        label={'Número'}
                        name={'phone'}
                        type={'tel'}
                        placeholder={'Informe seu número de celular'}
                        onChange={handleChange}
                    />
                    <InputComponent
                        label={isAccount ? 'CPF' : 'CNPJ'}
                        name={'cnpj_cpf'}
                        type={'text'}
                        placeholder={isAccount ? 'Informe seu CPF' : 'Informe o CNPJ'}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.button}>
                    <button onClick={() => nextStep('step2')} className={styles.submitButton}>
                        Continuar <ArrowRight size={24} color={'#111827'} />
                    </button>
                </div>
            </div>
        </>
    );
}
