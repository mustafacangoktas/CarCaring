import * as React from 'react';
import {Modal, Portal, Text, Button, TextInput} from 'react-native-paper';
import {Appearance, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect} from 'react';
import Config from '../../config.ts';

const PasswordChange = (props: {show: boolean}) => {
  const [visible, setVisible] = React.useState(props.show);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [resetKey, setResetKey] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [error, setError] = React.useState('');

  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    setVisible(props.show);
  }, [props.show]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          padding: 60,
          backgroundColor: isDark ? '#22252e' : '#DEE9EA',
        }}>
        <ScrollView>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
              marginBottom: 30,
              color: isDark ? '#A7ACBD' : '#4D5157',
            }}
            variant="displaySmall">
            Yönetici Şifresi Değiştir
          </Text>
          {error && (
            <Text
              style={{
                color: 'red',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              {error}
            </Text>
          )}
          <TextInput
            style={{marginTop: 20}}
            label="Şifre Sıfırlama Anahtarı"
            defaultValue={resetKey}
            onChangeText={text => setResetKey(text)}
          />
          <TextInput
            style={{marginTop: 20}}
            label="Yeni Şifre"
            defaultValue={password}
            onChangeText={text => setPassword(text)}
          />

          <Button
            mode="contained"
            onPress={() => {
              if (!resetKey || !password) {
                setError('Anahtar ve şifre boş olamaz.');
                return;
              }
              fetch(Config.API_URL + '/auth/change-password', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + Config.API_KEY,
                },
                body: JSON.stringify({
                  resetToken: resetKey,
                  newPassword: password,
                }),
              })
                .then(response => {
                  response.json().then(data => {
                    console.log(data);
                    hideModal();
                  });
                })
                .catch(e => {
                  console.error(e);
                  setError('Şifre değiştirilemedi. Anahtarı kontrol edin.');
                });
            }}
            style={{marginTop: 20}}>
            Değiştir
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default PasswordChange;
