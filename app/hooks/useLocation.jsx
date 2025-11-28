import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      if (coords) {
        const { longitude: lon, latitude: lat } = coords;
        console.log('Longitude:', lon, 'Latitude:', lat);
        setLongitude(lon);
        setLatitude(lat);

        let response = await Location.reverseGeocodeAsync({
          longitude: lon,
          latitude: lat,
        });

        console.log('user location is: ', response);
      }
    } catch (e) {
      setErrorMsg(e.message || 'Failed to get location');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { longitude, latitude, errorMsg };
};

export default useLocation;
