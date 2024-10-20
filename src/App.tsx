import React from 'react';

import {CommonActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RegisterScreen from './pages/Register.tsx';
import Search from './pages/Search.tsx';
import Services from './pages/services/Services.tsx';
import {View} from 'react-native';
import LoginPage from './components/LoginPage.tsx';
import Config from './config.ts';
import Appointments from './pages/Appointments.tsx';

const Tab = createBottomTabNavigator();

export default function MyComponent() {
  const [isLogged, setIsLogged] = React.useState(false);

  if (!isLogged) {
    return <LoginPage onLogin={() => setIsLogged(true)} />;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({navigation, state, descriptors, insets}: any) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({route, preventDefault}: any) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }

            return null;
          }}
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}>
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarLabel: 'Araç Kayıt',
          tabBarIcon: ({color, size}: any) => {
            return <Icon name="car" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="PlateSearch"
        component={Search}
        options={{
          tabBarLabel: 'Plaka Sorgu',
          tabBarIcon: ({color, size}: any) => {
            return <Icon name="account-search" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          tabBarLabel: 'Randevular',
          tabBarIcon: ({color, size}: any) => {
            return <Icon name="handshake" size={size} color={color} />;
          },
        }}
      />
      {Config.IS_ADMIN && (
        <Tab.Screen
          name="Services"
          component={Services}
          options={{
            tabBarLabel: 'Hizmetler',
            tabBarIcon: ({color, size}: any) => {
              return <Icon name="file-cabinet" size={size} color={color} />;
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
}
