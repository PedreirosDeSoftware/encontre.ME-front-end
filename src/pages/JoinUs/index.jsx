import { useState } from 'react';
import styles from './css/style.module.css';
import { StepDefault } from './steps/default';
import { StepFirst } from './steps/step1';
import { StepSecond } from './steps/step2';
import { StepTerceary } from './steps/step3';
import { Loading } from '../../components/Loading';
import { Link } from 'react-router-dom';

function JoinUs() {
  const [step, setStep] = useState('default'); // default | step1 | step2 | step3
  const [isAccount, setIsAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cnpj_cpf: '',
    phone: '',
    state: '',
    city: '',
    cep: '',
    address: '',
    avatarImage : ''
  });

  const nextStep = (nextStep) => {
    setStep(nextStep);
  };

  const prevStep = (prevStep) => {
    setStep(prevStep);
  };

  const handleFormData = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const handleSubmit = async () => {
    console.log('Submitting formData:', formData); // Check the formData before submission
    try {
      setLoading(true)
      const response = await fetch('https://encontre-me-back-end.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Network error:', error);
    }finally{
      setLoading(false)
    }
  };

  if (loading) return <Loading />;

  return (
    <div className={styles.appContainer}>

      <div className={styles.container}>
        {step === 'default' && <StepDefault setIsAccount={setIsAccount} nextStep={nextStep} />}
        {step === 'step1' && <StepFirst isAccount={isAccount} nextStep={nextStep} prevStep={prevStep} handleFormData={handleFormData} />}
        {step === 'step2' && <StepSecond nextStep={nextStep} prevStep={prevStep} handleFormData={handleFormData} />}
        {step === 'step3' && <StepTerceary prevStep={prevStep} handleFormData={handleFormData} formData={formData} onSubmit={handleSubmit} />}
      </div>
    </div>
  );
}

export default JoinUs;
