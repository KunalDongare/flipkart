import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [cameraFocus, setCameraFocus] = useState({x: 0.5, y: 0.5}); // Default focus point at center
  const [capturedImage, setCapturedImage] = useState(null);
  const device = useCameraDevice('back', [
    {videoAspectRatio: 16 / 9},
    {videoResolution: {width: 3048, height: 2160}},
    {fps: 60},
  ]);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message:
            'App needs access to your camera to take photos and record videos.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasCameraPermission(true);
      } else {
        setHasCameraPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFocusPress = event => {
    // Calculate focus point based on touch event coordinates
    const {locationX, locationY} = event.nativeEvent;
    const screenWidth = event.target.clientWidth;
    const screenHeight = event.target.clientHeight;
    const focusX = locationX / screenWidth;
    const focusY = locationY / screenHeight;

    // Set new focus point
    setCameraFocus({x: focusX, y: focusY});
  };

  const adjustFocus = () => {
    // Adjust focus to a new random point
    const newFocusX = Math.random();
    const newFocusY = Math.random();
    setCameraFocus({x: newFocusX, y: newFocusY});
  };

  const takePhoto = async () => {
    if (device) {
      const photo = await device.takePhoto({
        quality: 'max', // You can adjust quality as needed
      });
      setCapturedImage(photo.uri);
    }
  };

  if (!hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Text>No camera permission granted!</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>No camera device found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        focusPointOfInterest={cameraFocus}>
        <TouchableOpacity
          style={styles.focusOverlay}
          onPress={handleFocusPress}
        />
        <TouchableOpacity
          style={styles.adjustFocusButton}
          onPress={adjustFocus}>
          <Text style={styles.adjustFocusButtonText}>Adjust Focus</Text>
        </TouchableOpacity>
      </Camera>
      {capturedImage && (
        <View style={styles.imageContainer}>
          <Image source={{uri: capturedImage}} style={styles.capturedImage} />
        </View>
      )}
      {/* Button to take photo */}
      <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
        <Text style={styles.captureButtonText}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
  },
  focusOverlay: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  adjustFocusButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  adjustFocusButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  captureButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  capturedImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});
