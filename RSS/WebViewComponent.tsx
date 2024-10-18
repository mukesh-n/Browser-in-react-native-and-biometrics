// import React from 'react';
// import { WebView } from 'react-native-webview';
// import { View, Text } from 'react-native';



// const WebViewComponent: React.FC = () => {

//   const handleLoad = () => {
//     // Log that the WebView has successfully loaded
//     console.log('WebView loaded successfully');
//   };
//   return (
//     <View style={{ flex: 1 }}>
//       <WebView 
//         source={{ uri: 'https://www.shanusboutique.com/' }}
//         // source={{ uri: 'http://skbl-hrpta.cloud24.mu/skbless/' }}
//         onLoad={handleLoad}
//         onError={(error) => console.error('WebView error:', error)}
//       />
//       {/* Optionally display token or other information */}
//       {/* <Text>Token will be logged to the console and stored securely.</Text> */}
//     </View>
//   );
// };

// export default WebViewComponent;

import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Alert, Text, StyleSheet, Animated, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const WebViewComponent: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    // Only check for internet connection on Android
    if (Platform.OS === 'android') {
      const fetchConnectionState = async () => {
        const state = await NetInfo.fetch();
        console.log('Initial connection state:', state);

        setIsConnected(state.isConnected || false);
        setIsInternetReachable(state.isInternetReachable || false);

        // Only show alert if not connected or internet unreachable
        if (!state.isConnected || !state.isInternetReachable) {
          Alert.alert(
            'No Internet Connection',
            'Please turn on your Wi-Fi or mobile data to continue.',
            [{ text: 'OK' }]
          );
        }
      };

      fetchConnectionState();

      const unsubscribe = NetInfo.addEventListener((state) => {
        console.log('Network state changed:', state);

        setIsConnected(state.isConnected || false);
        setIsInternetReachable(state.isInternetReachable || false);

        if (!state.isConnected || !state.isInternetReachable) {
          Alert.alert(
            'No Internet Connection',
            'Please turn on your Wi-Fi or mobile data to continue.',
            [{ text: 'OK' }]
          );
        }
      });

      return () => {
        unsubscribe();
      };
    } else {
      // For iOS, you can set isConnected and isInternetReachable to true
      setIsConnected(true);
      setIsInternetReachable(true);
    }
  }, []);

  const handleMessage = (event: any) => {
    const token = event.nativeEvent.data;
    console.log('Received token:', token);
  };

  const handleLoad = () => {
    console.log('WebView loaded successfully');
    setLoading(false); // End loading
  };

  const handleError = (error: any) => {
    console.error('WebView error:', error);
    setLoading(false); // End loading on error
  };

  return (
    <View style={styles.container}>
      {isConnected && isInternetReachable ? (
        <>
          <WebView
            source={{ uri: 'http://skbl-hrpta.cloud24.mu/skbless/' }} // Change URL if needed
            onMessage={handleMessage}
            onLoad={handleLoad}
            onError={handleError} // Handle loading errors
            style={styles.webview} // Ensure WebView occupies the rest of the space

            // Enable caching with cacheMode set to use cache first
            cacheEnabled={true} // Enable caching
            cacheMode={'LOAD_CACHE_ELSE_NETWORK'} // Use cached content first if available, otherwise use network
          />
          {loading && (
            <View style={styles.loaderContainer}>
              <View style={styles.loadingRow}>
                <Text style={styles.loadingText}>Loading</Text>
                <View style={styles.dotsContainer}>
                  <AnimatedDot index={0} />
                  <AnimatedDot index={1} />
                  <AnimatedDot index={2} />
                </View>
              </View>
            </View>
          )}
        </>
      ) : (
        <Text style={styles.errorText}>No internet connection. Please check your network.</Text>
      )}
    </View>
  );
};

const AnimatedDot = ({ index }: { index: number }) => {
  const opacity = new Animated.Value(0); // Start invisible

  useEffect(() => {
    const animateDot = () => {
      opacity.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            delay: index * 300, // Delay based on index for sequential animation
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 } // Loop indefinitely
      ).start();
    };
    animateDot();
  }, [opacity, index]);

  return (
    <Animated.Text style={[styles.dot, { opacity }]}>.</Animated.Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes the full height
  },
  loaderContainer: {
    position: 'absolute', // Position loader absolutely
    top: 0, // Align to the top
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', // Center the loader vertically
    alignItems: 'center', // Center the loader horizontally
    backgroundColor: '#000000', // Background color
    zIndex: 1, // Make sure loader is above the WebView
  },
  loadingRow: {
    flexDirection: 'row', // Align loading text and dots in a row
    alignItems: 'center', // Center items vertically within the row
  },
  loadingText: {
    fontSize: 24, // Adjust as needed
    fontWeight: 'bold',
    marginRight: 5, // Space between loading text and dots
  },
  dotsContainer: {
    flexDirection: 'row', // Align dots in a row
  },
  dot: {
    fontSize: 24, // Adjust dot size
    marginHorizontal: 2, // Space between dots
  },
  webview: {
    flex: 1, // Allow WebView to fill the available space
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default WebViewComponent;
