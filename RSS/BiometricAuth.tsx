import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';

interface Props {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const BiometricAuth: React.FC<Props> = ({ setAuthenticated }) => {
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    const checkBiometrics = async () => {
      try {
        const { available } = await rnBiometrics.isSensorAvailable();
        if (available) {
          authenticateWithBiometrics();
        } else {
          Alert.alert('Biometrics not available', 'Biometric authentication is not available on this device.');
        }
      } catch (error) {
        console.error('Biometrics check failed:', error);
      }
    };

    const authenticateWithBiometrics = async () => {
      try {
        const { success } = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate to access the app',
        });
        if (success) {
          setAuthenticated(true);
        } else {
          Alert.alert('Authentication failed', 'Please try again.');
        }
      } catch (error) {
        console.error('Biometric authentication failed:', error);
      }
    };

    checkBiometrics();
  }, []);

  return null;
};

export default BiometricAuth;
