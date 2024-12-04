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

  const htmlTest =
  `
  <html>
  <head>
  <script type="importmap">
    {
      "imports": {
        "MP_SDK": "https://static.matterport.com/showcase-sdk/bootstrap/3.0.0-0-g0517b8d76c/sdk.es6.js"
      }
    }
  </script>
  <script type="text/javascript">
    window.ReactNativeWebView.postMessage("before head has started..");
  </script>
  </head>
  <body>
    <iframe
      width="650"
      height="480"
      src="https://my.matterport.com/show?m=SxQL3iGyoDo&play=1&applicationKey=du9h8tpf20fegyna491whw17b"
      frameborder="0"
      allow="fullscreen *"
      id="showcase-iframe">
    </iframe>
    <script type="module">
      window.ReactNativeWebView.postMessage("before import has started..");
      import { connect } from 'MP_SDK';
      (async function connectSdk() {
        window.ReactNativeWebView.postMessage("connectSdk fun has started..");
        const iframe = document.getElementById('showcase-iframe');

        // connect the sdk; log an error and stop if there were any connection issues
        try {
          window.ReactNativeWebView.postMessage("try has started..");
          const mpSdk = await connect(iframe);
          onShowcaseConnect(mpSdk);
        } catch (e) {
          window.ReactNativeWebView.postMessage(e);
        }
      })();

      async function onShowcaseConnect(mpSdk) {
        // insert your sdk code here. See the ref https://matterport.github.io/showcase-sdk//docs/reference/current/index.html

        // try retrieving the model data and log the model's sid
        try {
          const modelData = await mpSdk.Model.getData();
          console.log('Model sid:' + modelData.sid);
        } catch (e) {
          console.error(e);
        }
      }
    </script>
  </body>
</html>`
  ;

 // may be failinng at initializing matterport sdk
  const onMessage = (event: any) => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);
      if (messageData.type === 'snapshot') {
        // Handle the received snapshot

        setSnapshotUri(messageData.data);
        Alert.alert('Snapshot Captured', 'The snapshot has been captured successfully.');
      
    } else if (messageData.type === 'error') {
        Alert.alert('Error', messageData.message);
      }    
    } catch (error) {
      console.error('Error parsing message from WebView:', error);
    }  
};
  // return (
  //   <View style={styles.container}>
  //       <WebView ref={webviewRef}
  //       originWhitelist={['*']}
  //       source={{ html: htmlContent }}
  //       // source={{ html: '<h1><center>Hello world</center></h1>' }} 

  //       // <WebView 
  //       // originWhitelist={['*']}
  //       // source={{ html: '<h1>Hello World</h1>' }} 
  //       // style={{ borderColor: "red", borderWidth: 1, height: 100}}/>

  //       style={styles.webview}
  //       onMessage={onMessage}
  //       javaScriptEnabled={true}
  //       domStorageEnabled={true}
  //       allowFileAccess={true}
  //     />
  //   </View>  
  //   );

  return (
    <View style={styles.container}>
      <WebView ref={webviewRef}originWhitelist={['*']}
        source={{ html: htmlTest }}
        style={styles.webview}onMessage={onMessage}javaScriptEnabled={true}domStorageEnabled={true}allowFileAccess={true}
      />      
      {snapshotUri && ( 
        <View style={styles.snapshotContainer}>
        <Text style={styles.snapshotTitle}>Captured Snapshot:</Text>
          <Image source={{ uri: snapshotUri }}
            style={styles.snapshotImage}resizeMode="contain"
          /></View>
      )}
    </View>  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1, height: 400, width: 500, borderColor: 'red', borderWidth: 1 },
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