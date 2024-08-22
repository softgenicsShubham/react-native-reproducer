import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './bottomTab/HomeScreen';
import DiscoverScreen from './bottomTab/DiscoverScreen';
import NewVideoScreen from './bottomTab/NewVideoScreen';
import InboxScreen from './bottomTab/InboxScreen';
import ProfileScreen from './bottomTab/ProfileScreen';

type TabParamList = {
  HomeScreen: undefined;
  DiscoverScreen: undefined;
  NewVideoScreen: undefined;
  InboxScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const IndexScreen: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'HomeScreen':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'DiscoverScreen':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'NewVideoScreen':
              iconName = focused ? 'camera' : 'camera-outline';
              break;
            case 'InboxScreen':
              iconName = focused ? 'mail' : 'mail-outline';
              break;
            case 'ProfileScreen':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='HomeScreen' component={HomeScreen} />
      <Tab.Screen name='DiscoverScreen' component={DiscoverScreen} />
      <Tab.Screen name='NewVideoScreen' component={NewVideoScreen} />
      <Tab.Screen name='InboxScreen' component={InboxScreen} />
      <Tab.Screen name='ProfileScreen' component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default IndexScreen;