import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeoCheck = ({ children, restrictedContent, region }) => {
  const [isRestricted, setIsRestricted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://ipinfo.io?token=58e6c8d230085c');
        const userCountry = response.data.country;

        if (userCountry == region) {
          setIsRestricted(true);
        }
      } catch (error) {
        console.error('Ошибка при получении данных о местоположении:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  if (isLoading) {
    return null; 
  }

  return isRestricted ? (
    <>{restrictedContent}</> 
  ) : (
    <>{children}</>
  );
};

export default GeoCheck;
