import { Link } from "react-router-dom";
import styles from './css/style.module.css';
import logo from './../../assets/Logo.svg'
import User from "../User";

export function Header() {
    return(
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" />
            </div>
            <nav className={styles.links}>
                <Link to={'/'}>Encontrar pessoas</Link>
                <Link to={'/sos'}>S.O.S</Link>
                <Link to={'/instituicoes'}>Encontrar instituições</Link>
            </nav>
            <div className={styles.userContainer}>
                <User.Short image="https://avatars.githubusercontent.com/u/64737334?v=4" username="Ivandro Neto" />
            </div>
        </header>
    )
}