import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeoCheck = ({ 
  children, 
  region, 
  blockMessage = "Доступ к этому контенту заблокирован в вашем регионе.", 
  fallback = null, 
  onCheck = (userCountry, region) => userCountry === region 
}) => {
  const [isRestricted, setIsRestricted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(blockMessage);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://ipinfo.io?token=58e6c8d230085c');
        const userCountry = response.data?.country;
        setIsRestricted(onCheck(userCountry, region));
      } catch (error) {
        // console.error('Ошибка при получении данных о местоположении:', error);
        setIsRestricted(true);
        setErrorMessage("Отключите AdBlock для получения доступа к контенту.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [region, onCheck]);

  if (isLoading) return fallback;

  return isRestricted ? (
    <div style={{
      padding: '20px',
      backgroundColor: '#ffdddd',
      color: '#b00',
      textAlign: 'center',
      borderRadius: '8px',
      fontWeight: 'bold',
    }}>
      {errorMessage}
    </div>
  ) : (
    <>{children}</>
  );
};

export default GeoCheck;
