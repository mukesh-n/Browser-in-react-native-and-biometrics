import React from 'react';
import { WebView } from 'react-native-webview';

const WebViewComponent: React.FC = () => {
  return (
    <WebView
      source={{ uri: 'https://www.shanusboutique.com/mobile' }}
      onLoad={() => console.log('WebView loaded successfully')}
      onError={(error) => console.error('WebView error:', error)}
    />
  );
};

export default WebViewComponent;
