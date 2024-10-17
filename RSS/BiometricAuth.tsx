import React, { useEffect, useState } from 'react';
import { Alert, NativeModules, Platform } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const { DeviceLockAuth } = NativeModules;

interface Props {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const BiometricAuth: React.FC<Props> = ({ setAuthenticated }) => {
  const [failedAttempts, setFailedAttempts] = useState(0);
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    try {
      if (Platform.OS === 'ios') {
        fallbackToDeviceLock('Biometric authentication is not available on this device.');
      } else {
        const { available } = await rnBiometrics.isSensorAvailable();
        if (available) {
          authenticateWithBiometrics();
        } else {
          fallbackToDeviceLock('Biometric authentication is not available on this device.');
        }
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
      console.log("success",)
      if (success) {
        setAuthenticated(true);
      } else {
        promptForAppLock();
      }
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      promptForAppLock();
    }
  };

  // const handleFailedAttempt = () => {
  //   setFailedAttempts((prevAttempts) => {
  //     const newAttempts = prevAttempts + 1;
  //     if (newAttempts >= 3) {
  //       fallbackToDeviceLock('Too many failed biometric attempts.');
  //     } else {
  //       promptForAppLock();
  //     }
  //     return newAttempts;
  //   });
  // };

  const promptForAppLock = () => {
    Alert.alert(
      'Authentication Failed',
      'Would you like to proceed with device lock?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('User chose to cancel app lock'),
          style: 'cancel',
        },
        {
          text: 'Proceed',
          onPress: () => {
            setFailedAttempts(3); // Skip further biometric attempts
            fallbackToDeviceLock("You can enter your PIN or pattern now.");
          },
        },
      ]
    );
  };

  const fallbackToDeviceLock = async (message: string) => {
    if (Platform.OS === 'ios') {
      try {
        const success = await DeviceLockAuth.authenticate();
        if (success) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('Device lock authentication failed:', error);
      }
    } else {
      Alert.alert(message);
    }
  };
  
  return null;
};



export default BiometricAuth;