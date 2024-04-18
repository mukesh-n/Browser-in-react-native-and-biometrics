// import React from 'react';
// import { SafeAreaView, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// const App = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <WebView
//   source={{ uri: 'https://www.shanusboutique.com/mobile' }}
//   onLoad={() => console.log('WebView loaded successfully')}
// />

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;


// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, Button, Alert } from 'react-native';
// import { WebView } from 'react-native-webview';
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'; // Import BiometryTypes directly

// type BiometryType = 'TouchID' | 'FaceID' | 'Biometrics';
// const App = () => {
//   const [authenticated, setAuthenticated] = useState(false);
  
//   const [biometricType, setBiometricType] = useState<BiometryType | null>(null);
//   const rnBiometrics = new ReactNativeBiometrics(); // Create an instance of ReactNativeBiometrics

//   useEffect(() => {
//     checkBiometrics();
//   }, []);

//   const checkBiometrics = async () => {
//     try {
//       const { available, biometryType } = await rnBiometrics.isSensorAvailable(); // Use the instance to call isSensorAvailable()
//       if (available && biometryType) {
//         setBiometricType(biometryType);
//         authenticateWithBiometrics();
//       } else {
//         setBiometricType(null);
//         Alert.alert('Biometrics not available', 'Biometric authentication is not available on this device.');
//       }
//     } catch (error) {
//       console.error('Biometrics check failed:', error);
//     }
//   };

//   const authenticateWithBiometrics = async () => {
//     try {
//       const { success } = await rnBiometrics.simplePrompt({ // Use the instance to call simplePrompt()
//         promptMessage: 'Authenticate to access the app',
//       });
//       if (success) {
//         setAuthenticated(true);
//       } else {
//         setAuthenticated(false);
//         Alert.alert('Authentication failed', 'Please try again.');
//       }
//     } catch (error) {
//       console.error('Biometric authentication failed:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {authenticated ? (
//        <WebView
//        source={{ uri: 'https://www.shanusboutique.com/mobile' }}
//        onLoad={() => console.log('WebView loaded successfully')}
//        onError={(error) => console.error('WebView error:', error)}
//      />
//       ) : (
//         <Text style={styles.text}>
//           {biometricType === BiometryTypes.FaceID
//             ? 'Authenticate using Face ID to access the app'
//             : biometricType === BiometryTypes.Biometrics
//             ? 'Authenticate using Biometrics to access the app'
//             : 'Biometric authentication is not available'}
//         </Text>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginHorizontal: 20,
//   },
// });

// export default App;


// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

// type BiometryType = 'TouchID' | 'FaceID' | 'Biometrics';

// const App = () => {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [biometricType, setBiometricType] = useState<BiometryType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const rnBiometrics = new ReactNativeBiometrics();

//   useEffect(() => {
//     checkBiometrics();
//   }, []);

//   const checkBiometrics = async () => {
//     try {
//       const { available, biometryType } = await rnBiometrics.isSensorAvailable();
//       if (available && biometryType) {
//         setBiometricType(biometryType);
//         await authenticateWithBiometrics();
//         setAuthenticated(true);
//         setLoading(false); // Set loading to false after authentication completes
//       } else {
//         setBiometricType(null);
//         // Alert.alert('Biometrics not available', 'Biometric authentication is not available on this device.');
//         setLoading(false); // Set loading to false if biometrics are not available
//       }
//     } catch (error) {
//       console.error('Biometrics check failed:', error);
//     }
//   };

//   const authenticateWithBiometrics = async () => {
//     try {
//       const { success } = await rnBiometrics.simplePrompt({
//         promptMessage: 'Authenticate to access the app',
//       });
//       if (!success) {
//         setAuthenticated(false);
//         setLoading(false); // Set loading to false if authentication fails
//         // Alert.alert('Authentication failed', 'Please try again.');
//       }
//     } catch (error) {
//       console.error('Biometric authentication failed:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {loading ? ( // Display loading indicator while checking biometrics
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : authenticated ? (
//         <WebView
//           source={{ uri: 'https://www.shanusboutique.com/mobile' }}
//           onLoad={() => console.log('WebView loaded successfully')}
//           onError={(error) => console.error('WebView error:', error)}
//         />
//       ) : (
//         <Text style={styles.text}>
//           {biometricType === BiometryTypes.FaceID
//             ? 'Authenticate using Face ID to access the app'
//             : biometricType === BiometryTypes.Biometrics
//             ? 'Authenticate using Biometrics to access the app'
//             : 'Biometric authentication is not available'}
//         </Text>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginHorizontal: 20,
//   },
// });

// export default App;


import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import BiometricAuth from './BiometricAuth';
import WebViewComponent from './WebViewComponent';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {authenticated ? (
        <WebViewComponent />
      ) : (
        <BiometricAuth setAuthenticated={setAuthenticated} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
