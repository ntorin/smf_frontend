import { Navigation } from 'react-native-navigation';


import Nav from './pages/nav/Nav';
import Login from './pages/login/Login';
import MyProfile from './pages/home/tabs/myProfile/MyProfile';
import Messages from './pages/home/tabs/messages/Messages';
import Chat from './pages/chat/Chat';
import UserDirectory from './pages/nav/items/UserDirectory';
import Settings from './pages/nav/items/Settings';
import Help from './pages/nav/items/Help';
import About from './pages/nav/items/About';


export default function () {
  Navigation.registerComponent('storytime_buddies_frontend.Nav', () => Nav);
  Navigation.registerComponent('storytime_buddies_frontend.Login', () => Login);
  Navigation.registerComponent('storytime_buddies_frontend.LobbyList', () => LobbyList);
  Navigation.registerComponent('storytime_buddies_frontend.Library', () => Library);
  Navigation.registerComponent('storytime_buddies_frontend.MyProfile', () => MyProfile);
  Navigation.registerComponent('storytime_buddies_frontend.Messages', () => Messages);

  Navigation.registerComponent('storytime_buddies_frontend.Chat', () => Chat);

  Navigation.registerComponent('storytime_buddies_frontend.UserDirectory', () => UserDirectory);
  Navigation.registerComponent('storytime_buddies_frontend.Settings', () => Settings);
  Navigation.registerComponent('storytime_buddies_frontend.Help', () => Help);
  Navigation.registerComponent('storytime_buddies_frontend.About', () => About);



}
