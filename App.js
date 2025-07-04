import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Search, Heart, Info } from 'lucide-react-native';

import { CollectionProvider } from './contexts/CollectionContext';
import HomeScreen from './screens/HomeScreen';
import CatalogScreen from './screens/CatalogScreen';
import PlatformGamesScreen from './screens/PlatformGamesScreen';
import GameDetailScreen from './screens/GameDetailScreen';
import CollectionScreen from './screens/CollectionScreen';
import InfoScreen from './screens/InfoScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CatalogStack = () => (
  <Stack.Navigator 
    screenOptions={{ headerShown: false }}
    initialRouteName="Catalog"
  >
    <Stack.Screen name="Catalog" component={CatalogScreen} />
    <Stack.Screen name="PlatformGames" component={PlatformGamesScreen} />
    <Stack.Screen name="GameDetail" component={GameDetailScreen} />
  </Stack.Navigator>
);

const CollectionStack = () => (
  <Stack.Navigator 
    screenOptions={{ headerShown: false }}
    initialRouteName="Collection"
  >
    <Stack.Screen name="Collection" component={CollectionScreen} />
    <Stack.Screen name="GameDetail" component={GameDetailScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
      <CollectionProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let IconComponent;

                if (route.name === 'Home') {
                  IconComponent = Home;
                } else if (route.name === 'CatalogStack') {
                  IconComponent = Search;
                } else if (route.name === 'CollectionStack') {
                  IconComponent = Heart;
                } else if (route.name === 'Info') {
                  IconComponent = Info;
                }

                return <IconComponent size={size} color={color} />;
              },
              tabBarActiveTintColor: '#00ff88',
              tabBarInactiveTintColor: '#666',
              tabBarStyle: {
                backgroundColor: '#111',
                borderTopColor: '#333',
              },
              headerShown: false,
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
            <Tab.Screen name="CatalogStack" component={CatalogStack} options={{ title: 'Catálogo' }} />
            <Tab.Screen name="CollectionStack" component={CollectionStack} options={{ title: 'Colección' }} />
            <Tab.Screen name="Info" component={InfoScreen} options={{ title: 'Info' }} />
          </Tab.Navigator>
        </NavigationContainer>
      </CollectionProvider>
  );
}