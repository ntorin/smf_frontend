import { Navigation } from 'react-native-navigation';


import Nav from './pages/nav/Nav';
import Login from './pages/login/Login';
import Messages from './pages/home/tabs/messages/Messages';
import Chat from './pages/chat/Chat';
import UserDirectory from './pages/nav/items/UserDirectory';
import Settings from './pages/nav/items/Settings';
import Help from './pages/nav/items/Help';
import About from './pages/nav/items/About';


export default function () {
  Navigation.registerComponent('smf_frontend.Nav', () => Nav);
  Navigation.registerComponent('smf_frontend.Login', () => Login);
  Navigation.registerComponent('smf_frontend.LobbyList', () => LobbyList);
  Navigation.registerComponent('smf_frontend.Library', () => Library);
  Navigation.registerComponent('smf_frontend.Messages', () => Messages);

  Navigation.registerComponent('smf_frontend.Chat', () => Chat);

  Navigation.registerComponent('smf_frontend.UserDirectory', () => UserDirectory);
  Navigation.registerComponent('smf_frontend.Settings', () => Settings);
  Navigation.registerComponent('smf_frontend.Help', () => Help);
  Navigation.registerComponent('smf_frontend.About', () => About);



}
