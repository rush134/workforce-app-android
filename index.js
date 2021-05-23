/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import App from './app/login';
// import App from './app/qr';
import App from './app/main';
// import App from './app/test';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
