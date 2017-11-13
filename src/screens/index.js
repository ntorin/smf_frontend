import { Navigation } from 'react-native-navigation';


import Nav from 'pages/nav/Nav';
import Login from 'pages/login/Login';
import Messages from 'pages/messages/Messages';
import Chat from 'pages/chat/Chat';
import UserDirectory from 'pages/directory/UserDirectory';
import Notifications from 'pages/notifications/Noficiations';
import Settings from 'pages/settings/Settings';
import Help from 'pages/help/Help';
import About from 'pages/about/About';
import Discovery from 'pages/discovery/Discovery';
import BBS from 'pages/bbs/BBS';
import CreateTopic from 'pages/bbs/CreateTopic';
import AdvancedSearch from 'pages/bbs/AdvancedSearch';
import ViewTopic from 'pages/bbs/ViewTopic';
import ReplyTopic from 'pages/bbs/ReplyTopic';
import Profile from 'pages/profile/Profile';
import EditProfile from 'pages/profile/EditProfile';
import Feed from 'pages/feed/Feed';
import Groups from 'pages/groups/Groups';
import CreateGroup from 'pages/groups/CreateGroup';


export default function () {
  Navigation.registerComponent('smf_frontend.Nav', () => Nav);
  Navigation.registerComponent('smf_frontend.Login', () => Login);
  Navigation.registerComponent('smf_frontend.Feed', () => Feed);
  Navigation.registerComponent('smf_frontend.Library', () => Library);
  Navigation.registerComponent('smf_frontend.Messages', () => Messages);
  Navigation.registerComponent('smf_frontend.Discovery', () => Discovery);
  Navigation.registerComponent('smf_frontend.BBS', () => BBS);
  Navigation.registerComponent('smf_frontend.CreateTopic', () => CreateTopic);
  Navigation.registerComponent('smf_frontend.AdvancedSearch', () => AdvancedSearch);
  Navigation.registerComponent('smf_frontend.ViewTopic', () => ViewTopic);
  Navigation.registerComponent('smf_frontend.ReplyTopic', () => ReplyTopic);
  Navigation.registerComponent('smf_frontend.Profile', () => Profile);
  Navigation.registerComponent('smf_frontend.EditProfile', () => EditProfile);
  Navigation.registerComponent('smf_frontend.Groups', () => Groups);
  Navigation.registerComponent('smf_frontend.CreateGroup', () => CreateGroup);
  Navigation.registerComponent('smf_frontend.Feed', () => Feed);
  Navigation.registerComponent('smf_frontend.Chat', () => Chat);
  Navigation.registerComponent('smf_frontend.UserDirectory', () => UserDirectory);
  Navigation.registerComponent('smf_frontend.Notifications', () => Notifications);
  Navigation.registerComponent('smf_frontend.Settings', () => Settings);
  Navigation.registerComponent('smf_frontend.Help', () => Help);
  Navigation.registerComponent('smf_frontend.About', () => About);
}
