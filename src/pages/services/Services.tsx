import {ScrollView, View, Appearance} from 'react-native';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import React, {useEffect} from 'react';
import Dropdown from '../../components/Dropdown.tsx';
import Config from '../../config.ts';
import ServiceList from '../../components/services/ServiceList.tsx';

export default function Services() {
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <View
        style={{
          padding: 30,
          height: '100%',
          backgroundColor: isDark ? '#22252e' : '#DEE9EA',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 30,
            color: isDark ? '#A7ACBD' : '#4D5157',
          }}
          variant="displaySmall">
          Hizmetler
        </Text>
        <ServiceList />
        <View style={{marginTop: 70}}></View>
      </View>
    </>
  );
}
