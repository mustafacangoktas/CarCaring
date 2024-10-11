import {ScrollView, View, Appearance} from 'react-native';
import {Button, Switch, Text, TextInput} from 'react-native-paper';
import React, {useEffect} from 'react';
import Dropdown from '../components/Dropdown.tsx';
import {Service} from '../components/services/ServiceList.tsx';
import Config from '../config.ts';

export default function Register() {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [plate, setPlate] = React.useState('');
  const [operations, setOperations] = React.useState<
    {name: string; price: number}[]
  >([]);
  const [refresh, setRefresh] = React.useState(false);

  const colorScheme = Appearance.getColorScheme();
  const [firstPage, setFirstPage] = React.useState(true);
  const isDark = colorScheme === 'dark';

  const [items, setItems] = React.useState<Service[]>([]);

  const clear = () => {
    setName('');
    setSurname('');
    setBrand('');
    setModel('');
    setPhone('');
    setPlate('');
    setOperations([]);
    setRefresh(!refresh);
    setFirstPage(true);
  };

  useEffect(() => {
    fetch(Config.API_URL + '/services', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Config.API_KEY,
      },
    }).then(response => {
      response.json().then(data => {
        setItems(data);
      });
    });
  }, [refresh]);

  const firstPageInputs = (
    <>
      <TextInput
        label="İsim"
        defaultValue={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={{marginTop: 20}}
        label="Soyisim"
        defaultValue={surname}
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
          items={items
            .map(item => {
              return {
                label: item.brand,
                value: item.brand,
              };
            })
            .filter(
              (item, index, self) =>
                index === self.findIndex(t => t.value === item.value),
            )}
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
          setValue={setModel}
          value={model}
          items={items
            .filter(item => item.brand === brand)
            .map(item => {
              return {
                label: item.model,
                value: item.model,
              };
            })
            .filter(
              (item, index, self) =>
                index === self.findIndex(t => t.value === item.value),
            )}
        />
      </View>
      <TextInput
        style={{marginTop: 20}}
        label="Telefon Numarası"
        defaultValue={phone}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        style={{marginTop: 20}}
        label="Plaka"
        defaultValue={plate}
        onChangeText={text => setPlate(text)}
      />

      <View
        style={{
          marginTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
        }}>
        <Button
          style={{width: '48%', padding: 5}}
          icon="close"
          mode="contained-tonal"
          onPress={clear}>
          Temizle
        </Button>
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            color: isDark ? '#A7ACBD' : '#4D5157',
            textAlign: 'center',
            fontSize: 20,
            textTransform: 'uppercase',
          }}>
          {brand} - {model} İşlemleri
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          gap: 10,
          flexWrap: 'wrap',
        }}>
        {items
          .filter(item => item.brand === brand && item.model === model)[0]
          ?.operations.map((operation, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
                marginTop: 20,
              }}>
              <Switch
                value={
                  operations.find(op => op.name === operation.name) !==
                  undefined
                    ? true
                    : false
                }
                onValueChange={() => {
                  const newOperations = [...operations];
                  if (
                    newOperations.find(op => op.name === operation.name) !==
                    undefined
                  ) {
                    newOperations.splice(
                      newOperations.findIndex(op => op.name === operation.name),
                      1,
                    );
                  } else {
                    newOperations.push({
                      name: operation.name,
                      price: operation.price,
                    });
                  }
                  setOperations(newOperations);
                }}
              />
              <Text
                style={{
                  color: isDark ? '#A7ACBD' : '#4D5157',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                {operation.name} - {operation.price} TL
              </Text>
            </View>
          ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 40,
        }}>
        <Text>
          Toplam: {operations.reduce((acc, op) => acc + op.price, 0)} TL
        </Text>
      </View>
      <View
        style={{
          marginTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
        }}>
        <Button
          style={{width: '48%', padding: 5}}
          icon="arrow-left"
          mode="contained-tonal"
          onPress={() => setFirstPage(true)}>
          Geri
        </Button>
        <Button
          style={{width: '48%', padding: 5}}
          icon="content-save"
          mode="contained-tonal"
          onPress={() => {
            fetch(Config.API_URL + '/records', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Config.API_KEY,
              },
              body: JSON.stringify({
                name: name,
                surname: surname,
                brand: brand,
                model: model,
                phone: phone,
                plate: plate,
                operations: operations,
              }),
            }).then(response => {
              if (response.status === 200) {
                clear();
              }
            });
          }}>
          Kaydet
        </Button>
      </View>
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
      <View style={{marginTop: 70}}></View>
    </ScrollView>
  );
}
