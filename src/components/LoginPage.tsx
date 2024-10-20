import {Appearance, Dimensions, ScrollView, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import React from 'react';
import Config from '../config.ts';

const LoginPage = (props: {onLogin: (password: string) => void}) => {
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'dark';

  const screenHeight = Dimensions.get('window').height;
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');

  const login = () => {
    fetch(Config.API_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Config.API_KEY,
      },
      body: JSON.stringify({password}),
    }).then(response => {
      response
        .json()
        .then(data => {
          if (!data.token) {
            setLoginError('Giriş başarısız. Şifreyi kontrol edin.');
            return;
          }
          Config.API_KEY = data.token;
          Config.IS_ADMIN = true;
          props.onLogin(password);
        })
        .catch(e => {
          console.error(e);
          setLoginError('Giriş başarısız. Şifreyi kontrol edin.');
        });
    });
  };

  return (
    <>
      <ScrollView
        style={{
          padding: 30,
          height: '100%',
          backgroundColor: isDark ? '#22252e' : '#DEE9EA',
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            height: screenHeight - 100,
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
            Giriş Yap
          </Text>
          {loginError ? (
            <Text style={{color: 'red', textAlign: 'center'}}>
              {loginError}
            </Text>
          ) : null}
          <TextInput
            style={{marginTop: 20}}
            label="Admin Şifresi"
            defaultValue={password}
            onChangeText={text => setPassword(text)}
          />
          <Button
            mode="contained"
            onPress={() => {
              login();
              console.log('Giriş Yapıldı');
            }}
            style={{marginTop: 20}}>
            Giriş Yap
          </Button>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              onPress={() => {
                props.onLogin('');
              }}
              style={{marginTop: 10, padding: 0}}>
              Çalışan olarak devam et
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default LoginPage;
