import { useState } from 'react';
import styles from './css/style.module.css';
import { StepDefault } from './steps/default';
import { StepFirst } from './steps/step1';
import { StepSecond } from './steps/step2';
import { StepTerceary } from './steps/step3';

function JoinUs() {

  const [ step, setStep] = useState('default') // default | step1 | step2 | step3
  const [ isUser, setIsUser] = useState(false)

  function nextStep(step) {
    setStep(step)
  }

  function prevStep(step) {
    setStep(step)
  }

  return (
    <div className={styles.appContainer}>
      <div className={styles.container}>
       {step === 'default' && <StepDefault setIsUser={setIsUser} nextStep={nextStep}/>}
       {step === 'step1' && <StepFirst isUser={isUser} nextStep={nextStep} prevStep={prevStep}/>}
       {step === 'step2' && <StepSecond nextStep={nextStep} prevStep={prevStep} />}
       {step === 'step3' && <StepTerceary prevStep={prevStep}/>}
      </div>
    </div>
  );
}

export default JoinUs;
