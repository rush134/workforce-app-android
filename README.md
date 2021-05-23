# workforce-app-android
React Native app for Workforce

REPO LINK: 

# https://www.qr-code-generator.com
# https://github.com/didinj/react-native-qrcode-scanner-example

[WARNING] Animated: `useNativeDriver` was not specified issue of ReactNativeBase Input

/Users/mwarade/Desktop/Personal_projects/workforce/react-native-qrcode-scanner-example/node_modules/react-native-qrcode-scanner/index.js

if (this.props.fadeIn) {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(this.state.fadeInOpacity, {
        toValue: 1,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      })
    ]).start();
}



[ISSUE] Failed to install the app. Make sure you have the Android development environment set up
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

[ISSUE] Could not initialize class org.codehaus.groovy.vmplugin.v7.Java7

# https://stackoverflow.com/a/63408978
In the file android/gradle/wrapper/gradle-wrapper.properties, ensure that the distributionUrl is as follows:

distributionUrl=https\://services.gradle.org/distributions/gradle-6.3-bin.zip
Note: If you installed jdk 14


<!-- Building for release -->
https://reactnative.dev/docs/signed-apk-android


# ADB Android wifi connect

#### https://help.famoco.com/developers/dev-env/adb-over-wifi/
#### https://reactnative.dev/docs/running-on-device


1. Connect the device and the computer to the same Wi-Fi network

2. Plug the device to the computer with a USB cable to configure the connection

3. Check you can see the device: 
    adb devices
    # If multiple devices error then
    adb -d tcpip 5555

    If you can't then enable debugging mode in android from developer options.

3. On the computer command line type: 
adb tcpip 5555

4. Get the local ip adddress of the mobile:

    Terminal: adb shell ip addr show wlan0 
    Or: Settings → About → Status.

5. On the computer command line type: 
    adb connect ip-address-of-device:5555

6. You can disconnect the USB cable from the device and check with adb devices that the device is still detected.