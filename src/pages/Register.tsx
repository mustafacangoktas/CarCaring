import {
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
  Appearance,
} from 'react-native';
import {
  Button,
  Checkbox,
  Divider,
  Menu,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dropdown from '../components/Dropdown.tsx';

export default function Register() {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [plate, setPlate] = React.useState('');
  const colorScheme = Appearance.getColorScheme();
  const [firstPage, setFirstPage] = React.useState(true);
  const isDark = colorScheme === 'dark';

  const firstPageInputs = (
    <>
      <TextInput
        label="İsim"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={{marginTop: 20}}
        label="Soyisim"
        value={surname}
        onChangeText={text => setSurname(text)}
      />
      <View
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        }}>
        <Dropdown
          placeholder={'Marka Seç'}
          setValue={setBrand}
          value={brand}
          items={[
            {
              label: 'Audi',
              value: 'audi',
            },
            {
              label: 'BMW',
              value: 'bmw',
            },
            {
              label: 'Mercedes',
              value: 'mercedes',
            },
          ]}
        />
      </View>
      <View
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        }}>
        <Dropdown
          placeholder={'Model Seç'}
          setValue={setBrand}
          value={brand}
          items={[
            {
              label: 'A3',
              value: 'a3',
            },
            {
              label: 'A4',
              value: 'a4',
            },
            {
              label: 'A5',
              value: 'a5',
            },
          ]}
        />
      </View>
      <TextInput
        style={{marginTop: 20}}
        label="Telefon Numarası"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        style={{marginTop: 20}}
        label="Plaka"
        value={plate}
        onChangeText={text => setPlate(text)}
      />

      <View
        style={{
          marginTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Button
          style={{width: '48%', padding: 5}}
          icon="arrow-right"
          mode="contained-tonal"
          onPress={() => setFirstPage(false)}>
          İleri
        </Button>
      </View>
    </>
  );

  const secondPageInputs = (
    <>
      <Checkbox status={'checked'} />
      <Button
        style={{width: '48%', padding: 5}}
        icon="arrow-left"
        mode="contained-tonal"
        onPress={() => setFirstPage(true)}>
        Geri
      </Button>
    </>
  );

  return (
    <ScrollView
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
        Araç Kayıt
      </Text>
      {firstPage ? firstPageInputs : secondPageInputs}
    </ScrollView>
  );
}
