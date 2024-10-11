/**
 * @format
 */

import * as React from 'react';
import {Appearance, AppRegistry} from 'react-native';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './src/App';
import {NavigationContainer} from '@react-navigation/native';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(69, 130, 172)', // Moru maviye çektim
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(219, 240, 255)', // Daha açık mavi
    onPrimaryContainer: 'rgb(0, 44, 81)', // Koyu mavi
    secondary: 'rgb(90, 111, 130)', // Gri-mavi karışımı
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(221, 237, 246)', // Açık mavi ton
    onSecondaryContainer: 'rgb(24, 33, 42)', // Koyu mavi-gri
    tertiary: 'rgb(81, 102, 128)', // Mavi-gri karışımı
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(217, 236, 255)', // Açık mavi
    onTertiaryContainer: 'rgb(16, 33, 50)', // Koyu mavi
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(245, 250, 255)', // Açık mavi tonlu arka plan
    onBackground: 'rgb(27, 29, 30)', // Nötr koyu ton
    surface: 'rgb(245, 250, 255)', // Mavi-beyaz ton
    onSurface: 'rgb(27, 29, 30)', // Nötr koyu ton
    surfaceVariant: 'rgb(223, 233, 235)', // Hafif mavi tonlu
    onSurfaceVariant: 'rgb(69, 74, 78)', // Koyu gri-mavi
    outline: 'rgb(117, 124, 126)', // Gri tonlu
    outlineVariant: 'rgb(196, 204, 206)', // Açık gri-mavi
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(47, 50, 51)', // Koyu nötr ton
    inverseOnSurface: 'rgb(239, 245, 244)', // Açık ton
    inversePrimary: 'rgb(184, 220, 255)', // Açık mavi ton
    elevation: {
      level0: 'transparent',
      level1: 'rgb(242, 248, 251)',
      level2: 'rgb(236, 244, 248)',
      level3: 'rgb(231, 240, 246)',
      level4: 'rgb(229, 239, 245)',
      level5: 'rgb(226, 236, 243)',
    },
    surfaceDisabled: 'rgba(29, 27, 30, 0.12)',
    onSurfaceDisabled: 'rgba(29, 27, 30, 0.38)',
    backdrop: 'rgba(47, 51, 55, 0.4)', // Koyu mavi-gri ton
  },
};

const darkTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(184, 208, 255)',
    onPrimary: 'rgb(12, 71, 122)',
    primaryContainer: 'rgb(43, 95, 146)',
    onPrimaryContainer: 'rgb(219, 240, 255)',
    secondary: 'rgb(193, 208, 218)',
    onSecondary: 'rgb(44, 54, 63)',
    secondaryContainer: 'rgb(67, 77, 87)',
    onSecondaryContainer: 'rgb(221, 237, 246)',
    tertiary: 'rgb(183, 243, 255)',
    onTertiary: 'rgb(37, 75, 90)',
    tertiaryContainer: 'rgb(58, 101, 110)',
    onTertiaryContainer: 'rgb(217, 255, 255)',
    error: 'rgb(171, 201, 255)',
    onError: 'rgb(0, 45, 105)',
    errorContainer: 'rgb(0, 47, 147)',
    onErrorContainer: 'rgb(171, 201, 255)',
    background: 'rgb(27, 30, 35)',
    onBackground: 'rgb(225, 231, 240)',
    surface: 'rgb(27, 30, 35)',
    onSurface: 'rgb(225, 231, 240)',
    surfaceVariant: 'rgb(69, 74, 87)',
    onSurfaceVariant: 'rgb(196, 204, 220)',
    outline: 'rgb(142, 150, 168)',
    outlineVariant: 'rgb(69, 74, 87)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(225, 231, 240)',
    inverseOnSurface: 'rgb(47, 50, 55)',
    inversePrimary: 'rgb(69, 120, 172)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(35, 39, 48)',
      level2: 'rgb(40, 44, 55)',
      level3: 'rgb(44, 50, 62)',
      level4: 'rgb(46, 52, 65)',
      level5: 'rgb(49, 56, 72)',
    },
    surfaceDisabled: 'rgba(225, 231, 240, 0.12)',
    onSurfaceDisabled: 'rgba(225, 231, 240, 0.38)',
    backdrop: 'rgba(47, 51, 55, 0.4)',
  },
};

export default function Main() {
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <NavigationContainer>
      {
        <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <App />
        </PaperProvider>
      }
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
