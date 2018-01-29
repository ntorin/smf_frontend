import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import registerScreens from './screens';
import { startApp } from 'helpers/constants';

  // screen related book keeping
  registerScreens();
  startApp();