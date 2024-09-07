import {useNavigate } from 'react-router-dom';
import styles from './css/style.module.css';
import { useEffect, useState } from 'react';

function NotFoundPage() {
  const navigate = useNavigate()
  let [time, setTime] = useState(10);
  
  useEffect(()=>{
    let counter = time

    const interval = setInterval(()=>{
      counter--
      setTime(counter)
      console.log(counter)
      
      if(counter <= 0){
        counter = 0
        navigate('/feed')
        clearInterval(interval)
      } 
    }, 1000)

  })

  return(
    <div className={styles.container}>
        <h1>Opa! Parece que você está perdido...🥲</h1>
        <p>Vamos ajudar você a regressar para página inicial em {time} segundos.</p>
        <button onClick={() => navigate('/feed')}>
          <p>Regressar agora</p>
        </button>
    </div>
  );
}

export default NotFoundPage;