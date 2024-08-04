import styles from './css/style.module.css';

export function InputComponent({label, name, type, placeholder, setValue}) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} className={styles.input} placeholder={placeholder} />
        </div>
    )
}