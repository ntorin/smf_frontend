import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import registerScreens from './screens';

  // screen related book keeping
  registerScreens();
  startApp();

  function startApp() {
    // this will start our app
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'smf_frontend.Login',
        navigatorStyle: {
            navBarHidden: true,
            navBarTransparent: true,
            drawUnderNavBar: true,
        },
      },
      animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade'
    });
  }
