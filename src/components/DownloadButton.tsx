import React from 'react';
import {PermissionsAndroid, Platform, ToastAndroid, View} from 'react-native';
import {Button} from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';

const DownloadButton = (props: {
  fileUrl: string;
  fileName: string;
  label?: string;
}) => {
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to download files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const downloadFile = async () => {
    const permissionGranted = await requestPermission();
    if (!permissionGranted) {
      ToastAndroid.show('Dosya indirme izni verilmedi', ToastAndroid.SHORT);
      return;
    }

    const {fileUrl, fileName} = props;
    const {config, fs} = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir; // Android'de indirme klasörü

    // Dosyayı indir
    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${DownloadDir}/${fileName}`,
        description: 'Downloading file',
      },
    })
      .fetch('GET', fileUrl)
      .then(res => {
        console.log('Dosya başarıyla indirildi:', res.path());
        ToastAndroid.show('Dosya indirildi', ToastAndroid.SHORT);
      })
      .catch(error => {
        console.error('Dosya indirme hatası:', error);
        ToastAndroid.show('Dosya indirme hatası', ToastAndroid.SHORT);
      });
  };

  return (
    <View>
      <Button
        style={{width: '100%', padding: 5}}
        icon="download"
        mode="contained-tonal"
        onPress={() => {
          downloadFile();
        }}>
        {props.label || 'İndir'}
      </Button>
    </View>
  );
};

export default DownloadButton;
