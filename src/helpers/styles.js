import { StyleSheet } from 'react-native';
import { iconsMap } from 'helpers/icons-loader';

export const PrimaryColor = '#73cfc9';
export const PrimaryDimmed = 'rgba(115, 207, 201, 0.5)';
export const ScreenBackgroundColor = '#EDEDED'
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    padding: 15
  },
  
  absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
  },
});

export const NavMenu = {
                leftButtons: [{
                    icon: iconsMap['menu'],
                    id: 'menu',
                }]
            };

export const NavStyle = {
            navBarBackgroundColor: 'rgba(0, 0, 0, 0.5)',
            drawUnderNavBar: true,
            navBarTranslucent: true,
            tabBarBackgroundColor: 'rgba(0, 0, 0, 0.5)',
            drawUnderTabBar: true,
            tabBarTranslucent: true,
        };