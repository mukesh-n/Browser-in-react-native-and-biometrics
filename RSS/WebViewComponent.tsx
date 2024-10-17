import React from 'react';
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';

const INJECTED_JAVASCRIPT = `
  (function() {
    // Retrieve token from localStorage
    const token = window.localStorage.getItem('token');
    // Post the token to the React Native app
    window.ReactNativeWebView.postMessage(token);
  })();
`;

const WebViewComponent: React.FC = () => {
  // Function to handle messages from WebView
  const handleMessage = async (event: any) => {
    const token = event.nativeEvent.data;
    console.log('Received token:', token);
  };
  const handleLoad = () => {
    // Log that the WebView has successfully loaded
    console.log('WebView loaded successfully');
  };
  return (
    <View style={{ flex: 1 }}>
      <WebView 
        source={{ uri: 'http://skbl-hrpta.cloud24.mu/skbless/' }}
        // injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={handleMessage}
        onLoad={handleLoad}
        onError={(error) => console.error('WebView error:', error)}
      />
      {/* Optionally display token or other information */}
      <Text>Token will be logged to the console and stored securely.</Text>
    </View>
  );
};

export default WebViewComponent;