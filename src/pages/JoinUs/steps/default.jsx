import { ArrowLeft, Buildings, User } from '@phosphor-icons/react';
import styles from '../css/style.module.css';
import { useNavigate } from 'react-router-dom';

export function StepDefault({ setIsAccount, nextStep }) {
    const navigate = useNavigate()
    const handleUser = () => {
        setIsAccount(true);
        nextStep('step1');
        console.log('User selected');
    };

    const handleCompany = () => {
        setIsAccount(false);
        nextStep('step1');
        console.log('Company selected');
    };

    return (
        <>
            <div className={styles.title}>
                <button className={styles.x} onClick={() => navigate('/')}>
                    <ArrowLeft size={24} color='#111827' />
                </button>
                <h1>Junte-se a nós!</h1>
                <p>Cada nova conexão pode trazer alguém de volta para casa.</p>
            </div>
            <div className={styles.containerIcons}>
                <button onClick={handleCompany} className={styles.icon1}>
                    <div className={styles.iconPosition}>
                        <Buildings size={48} color='#111827' weight='fill' />
                        <h1>Instituição</h1>
                        <p>Vamos ajudar a vida de outras pessoas juntos.</p>
                    </div>
                </button>
                <button onClick={handleUser} className={styles.icon2}>
                    <div className={styles.iconPosition}>
                        <User size={48} color='#111827' weight='fill' />
                        <h1>Usuário</h1>
                        <p>Vamos encontrar seu(a) pessoa querida.</p>
                    </div>
                </button>
            </div>
        </>
    );
}
