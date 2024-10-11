import * as React from 'react';
import {Modal, Portal, Text, Button, TextInput} from 'react-native-paper';
import {Service} from './ServiceList.tsx';
import {Appearance, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect} from 'react';
import Config from '../../config.ts';

type Props = {
  show: boolean;
  defaultData?: Service | null;
  setRefresh: any;
};

const ServiceEditor = (props: Props) => {
  const [visible, setVisible] = React.useState(props.show);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [brand, setBrand] = React.useState(props.defaultData?.brand ?? '');
  const [model, setModel] = React.useState(props.defaultData?.model ?? '');
  const isEdit = props.defaultData !== null && props.defaultData !== undefined;
  const [saving, setSaving] = React.useState(false);
  const [operations, setOperations] = React.useState<
    {name: string; price: number}[]
  >(props.defaultData?.operations ?? []);
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    setVisible(props.show);
    setBrand(props.defaultData?.brand ?? '');
    setModel(props.defaultData?.model ?? '');
    setOperations(props.defaultData?.operations ?? []);
  }, [props.defaultData, props.show]);

  const saveService = () => {
    setSaving(true);
    fetch(Config.API_URL + '/services', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Config.API_KEY,
      },
      body: JSON.stringify({
        _id: props.defaultData?._id,
        brand,
        model,
        operations,
      }),
    }).then(response => {
      setSaving(false);
      props.setRefresh({});
      response.json().then(data => {
        console.log(data);
      });
    });
  };

  const deleteService = () => {
    setSaving(true);
    fetch(
      Config.API_URL +
        '/services/' +
        encodeURIComponent(props.defaultData?._id ?? ''),
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Config.API_KEY,
        },
      },
    ).then(response => {
      setSaving(false);
      props.setRefresh({});
      setVisible(false);
      response.json().then(data => {
        console.log(data);
      });
    });
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          padding: 60,
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
          {isEdit ? 'Hizmet Düzenle' : 'Yeni Hizmet'}
        </Text>
        <TextInput
          style={{marginTop: 20}}
          label="Araç Markası"
          defaultValue={brand}
          onChangeText={text => setBrand(text)}
        />
        <TextInput
          style={{marginTop: 20}}
          label="Araç Modeli"
          defaultValue={model}
          onChangeText={text => setModel(text)}
        />
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 30,
              fontSize: 20,
              color: isDark ? '#A7ACBD' : '#4D5157',
            }}>
            Hizmetler
          </Text>
          <ScrollView
            style={{
              maxHeight: 300,
            }}>
            {operations.map((operation, index) => (
              <View key={index} style={{marginTop: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {index + 1}. Hizmet
                  </Text>
                  <Icon
                    onPress={() => {
                      const newOperations = [...operations];
                      newOperations.splice(index, 1);
                      setOperations(newOperations);
                    }}
                    name={'close'}
                    size={22}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <TextInput
                    label="Hizmet Adı"
                    defaultValue={operation.name}
                    onChangeText={text => {
                      const newOperations = [...operations];
                      newOperations[index].name = text;
                      setOperations(newOperations);
                    }}
                  />
                  <TextInput
                    style={{marginTop: 20}}
                    label="Fiyat"
                    defaultValue={operation.price.toString()}
                    onChangeText={text => {
                      const newOperations = [...operations];
                      newOperations[index].price = parseFloat(text);
                      setOperations(newOperations);
                    }}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Icon
              style={{backgroundColor: isDark ? '#22252e' : '#DEE9EA'}}
              name={'plus'}
              size={26}
              onPress={() => {
                const newOperations = [...operations]; // Yeni bir dizi oluştur
                newOperations.push({name: '', price: 0});
                setOperations(newOperations);
              }}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 50,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            flexWrap: 'wrap',
          }}>
          {saving ? (
            <Text
              style={{
                color: isDark ? '#A7ACBD' : '#4D5157',
                textAlign: 'center',
                fontSize: 16,
              }}>
              İşlem yapılıyor...
            </Text>
          ) : (
            <>
              <Button
                style={{width: '48%', padding: 5}}
                icon="content-save"
                mode="contained-tonal"
                onPress={() => {
                  saveService();
                }}>
                Kaydet
              </Button>

              <Button
                style={{width: '48%', padding: 5}}
                icon="close"
                mode="contained-tonal"
                onPress={hideModal}>
                İptal
              </Button>

              {isEdit && (
                <Button
                  style={{width: '48%', padding: 5}}
                  icon="delete"
                  mode="contained-tonal"
                  onPress={() => {
                    deleteService();
                  }}>
                  Sil
                </Button>
              )}
            </>
          )}
        </View>
      </Modal>
    </Portal>
  );
};

export default ServiceEditor;
