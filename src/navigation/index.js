import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    HomeIcon as HomeOutline, 
    UserGroupIcon as UserGroupIconOutline,
    DocumentTextIcon as DocumentTextIconOutline,
} from 'react-native-heroicons/outline';
import { 
    HomeIcon as HomeSolid, 
    UserGroupIcon as UserGroupIconSolid,
    DocumentTextIcon as DocumentTextIconSolid,
} from 'react-native-heroicons/solid';

// screens
import Home from '../screens/Home';
import Acomodadores from '../screens/Acomodadores';
import Asignaciones from '../screens/Asignaciones';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            
            if (route.name === 'Home') {
              return focused ? <HomeSolid color={"#06b6d4"} /> : <HomeOutline color={"#6b7280"} />;
            } else if (route.name === 'Acomodadores') {
              return focused ? <UserGroupIconSolid color={"#06b6d4"} /> : <UserGroupIconOutline color={"#6b7280"} />;
            } else if (route.name === 'Asignaciones') {
              return focused ? <DocumentTextIconSolid color={"#06b6d4"} /> : <DocumentTextIconOutline color={"#6b7280"} />;
            }
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Acomodadores" component={Acomodadores} />
        <Tab.Screen name="Asignaciones" component={Asignaciones} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;