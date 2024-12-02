import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';


const MatterportView = () => {
  const webviewRef = useRef(null);
  const [snapshotUri, setSnapshotUri] = useState(null);

  // Replace with your base64-encoded HTML content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Matterport Viewer</title>
      <meta charset="UTF-8">
      <style>
        body, html, #showcase {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
        }
        #capture-button {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 1000;
          padding: 10px 20px;
          font-size: 16px;
        }
      </style>
      <!-- Include the Matterport SDK script -->
      <script src="https://static.matterport.com/showcase-sdk/latest.js"></script>
    </head>
    <body>
      <div id="showcase"></div>
      <button id="capture-button">Capture Snapshot</button>
      <script>
        // Replace with your Matterport SDK key
        const SDK_KEY = "du9h8tpf20fegyna491whw17b";

        // Replace with your Matterport space ID
        const SPACE_ID = "EadMuW7Tsh5";

        // Initialize the Matterport SDK
        window.MP_SDK.connect(
          document.getElementById('showcase'),
          SDK_KEY,
          SPACE_ID,
          {
            // SDK options
          }
        ).then(function (sdk) {
          console.log('Matterport SDK connected');

          // Function to capture a snapshot
          function captureSnapshot() {
            sdk.Renderer.takeScreenShot().then(function (screenshotURI) {
              // Send the screenshot data to the React Native app
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'snapshot',
                data: screenshotURI
              }));
            }).catch(function (error) {
              console.error('Error taking screenshot:', error);
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'error',
                message: error.message
              }));
            });
          }

          // Add event listener to the capture button
          document.getElementById('capture-button').addEventListener('click', captureSnapshot);
        }).catch(function (error) {
          console.error('Error connecting to Matterport SDK:', error);
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'error',
            message: error.message
          }));
        });
      </script>
    </body>
    </html>
  `;

  const onMessage = (event: any) => {
    // try {
    //   const messageData = JSON.parse(event.nativeEvent.data);
    //   if (messageData.type === 'snapshot') {
    //     // Handle the received snapshot

    //     setSnapshotUri(messageData.data);
    //     Alert.alert('Snapshot Captured', 'The snapshot has been captured successfully.');
      
    // } else if (messageData.type === 'error') {
    //     Alert.alert('Error', messageData.message);
    //   }    
    // } catch (error) {
    //   console.error('Error parsing message from WebView:', error);
    // }  
};
  return (
    <View style={styles.container}>
        <WebView ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}

        style={styles.webview}
        onMessage={onMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
      />
      {/* {snapshotUri && (
        <View style={styles.snapshotContainer}>
            <Text style={styles.snapshotTitle}>Captured Snapshot:</Text>
            <Image 
                source={{ uri: snapshotUri }}
                style={styles.snapshotImage} // ur at step 5
                resizeMode="contain"
            />
        </View>
      )} */}
    </View>  
    );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  snapshotContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#ffffffaa',
    padding: 10,
    borderRadius: 8,
  },
  snapshotTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  snapshotImage: { width: '100%', height: 200 },
});

export default MatterportView;