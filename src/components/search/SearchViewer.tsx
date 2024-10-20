import * as React from 'react';
import {Modal, Portal, Text, Button, TextInput} from 'react-native-paper';
import {PlateRecord} from './SearchResult.tsx';
import {Appearance, ScrollView, View} from 'react-native';
import Config from '../../config.ts';
import DownloadButton from '../DownloadButton.tsx';
import Util from '../../util.ts';

type Props = {
  show: boolean;
  setShown: any;
  defaultData?: PlateRecord | null;
};

const SearchViewer = (props: Props) => {
  const [saving, setSaving] = React.useState(false);
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'dark';

  const deleteRecord = () => {
    setSaving(true);
    fetch(
      Config.API_URL +
        '/records/' +
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
      props.setShown(false);
      response.json().then(data => {
        console.log(data);
      });
    });
  };

  return (
    <Portal>
      <Modal
        visible={props.show}
        onDismiss={() => {
          props.setShown(false);
        }}
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
            {props.defaultData?.plate} Sorgusu
          </Text>

          <View>
            <Text
              style={{
                color: isDark ? '#A7ACBD' : '#4D5157',
                textAlign: 'center',
                fontSize: 16,
              }}>
              {props.defaultData?.name} {props.defaultData?.surname}
            </Text>
            <Text
              style={{
                color: isDark ? '#A7ACBD' : '#4D5157',
                textAlign: 'center',
                fontSize: 16,
              }}>
              {props.defaultData?.phone}
            </Text>
            <Text
              style={{
                color: isDark ? '#A7ACBD' : '#4D5157',
                textAlign: 'center',
                fontSize: 16,
              }}>
              {props.defaultData?.brand} {props.defaultData?.model}
            </Text>
            <Text
              style={{
                color: isDark ? '#A7ACBD' : '#4D5157',
                textAlign: 'center',
                fontSize: 16,
              }}>
              Randevu:{' '}
              {Util.prettyDate(props.defaultData?.appointment ?? new Date())}
            </Text>
            {
              <ScrollView
                style={{
                  marginTop: 20,
                  maxHeight: 300,
                }}>
                {props.defaultData?.operations.map((operation, index) => (
                  <View
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                      backgroundColor: isDark ? '#2C2F3D' : '#F9F9F9',
                      margin: 5,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: isDark ? '#A7ACBD' : '#4D5157',
                        fontSize: 16,
                      }}>
                      {operation.name} - {operation.price} TL
                    </Text>
                  </View>
                ))}
              </ScrollView>
            }
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
                  icon="close"
                  mode="contained-tonal"
                  onPress={() => {
                    props.setShown(false);
                  }}>
                  Geri Dön
                </Button>
                {Config.IS_ADMIN && (
                  <Button
                    style={{width: '48%', padding: 5}}
                    icon="delete"
                    mode="contained-tonal"
                    onPress={() => {
                      deleteRecord();
                    }}>
                    Sil
                  </Button>
                )}
                <DownloadButton
                  fileUrl={
                    Config.API_URL +
                    '/records/' +
                    props.defaultData?._id +
                    '/download'
                  }
                  fileName={
                    props.defaultData?.plate! + props.defaultData?._id + '.xlsx'
                  }
                  label={'Kaydet'}
                />
              </>
            )}
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default SearchViewer;
