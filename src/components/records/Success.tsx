import * as React from 'react';
import {Modal, Portal, Text, Button, TextInput} from 'react-native-paper';
import {Appearance, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect} from 'react';
import Config from '../../config.ts';

const SuccessPage = (props: {show: boolean; onClosed: () => void}) => {
  const [visible, setVisible] = React.useState(props.show);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
              marginBottom: 20,
              color: isDark ? '#A7ACBD' : '#4D5157',
            }}
            variant="displaySmall">
            İşlem Başarılı!
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 10,
              color: isDark ? '#A7ACBD' : '#4D5157',
            }}>
            Kayıt başarıyla oluşturuldu!
          </Text>
          <Button
            style={{
              marginTop: 10,
              maxWidth: 300,
              alignSelf: 'center',
              borderRadius: 15,
            }}
            mode={'outlined'}
            onPress={() => {
              hideModal();
              props.onClosed();
            }}>
            Kapat
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default SuccessPage;
