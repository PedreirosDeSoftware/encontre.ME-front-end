import styles from './css/style.module.css';

export function InputComponent({ label, name, type, placeholder, onChange }) {
    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                className={styles.input}
                placeholder={placeholder}
                onChange={onChange} // Attach onChange handler
            />
        </div>
    );
}
