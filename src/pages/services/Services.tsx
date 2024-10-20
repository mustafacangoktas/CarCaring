import {ScrollView, View, Appearance} from 'react-native';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import React, {useEffect} from 'react';
import Dropdown from '../../components/Dropdown.tsx';
import Config from '../../config.ts';
import ServiceList from '../../components/services/ServiceList.tsx';
import PasswordChange from '../../components/services/PasswordChange.tsx';

export default function Services() {
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'dark';

  const [passwordReset, setPasswordReset] = React.useState(false);

  return (
    <ScrollView
      style={{
        padding: 30,
        height: '100%',
        backgroundColor: isDark ? '#22252e' : '#DEE9EA',
      }}>
      <PasswordChange show={passwordReset} />
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
      <Button
        style={{
          marginTop: 20,
          maxWidth: 300,
          alignSelf: 'center',
          borderRadius: 15,
        }}
        mode={'outlined'}
        onPress={() => {
          setPasswordReset(false);
          setTimeout(() => {
            setPasswordReset(true);
          }, 100);
        }}>
        Yönetici Şifresi Değiştir
      </Button>
      <View style={{marginTop: 70}}></View>
    </ScrollView>
  );
}
