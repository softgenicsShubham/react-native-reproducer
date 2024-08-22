import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FirstScreen from './src/screens/FirstScreen';
import IndexScreen from './src/screens/IndexScreen';
import { setHidden } from './src/native_modules/NavigationColorModules';

const Stack = createNativeStackNavigator();
const App: React.FC = () => {
  return (
    <NavigationContainer onReady={() => { setHidden(true); }}>
      <Stack.Navigator initialRouteName="IndexScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="IndexScreen" component={IndexScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;








