import {ScrollView, View, Appearance} from 'react-native';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import React, {useEffect} from 'react';
import Config from '../config.ts';
import SearchResult, {PlateRecord} from '../components/search/SearchResult.tsx';

export default function Services() {
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'dark';
  const [plate, setPlate] = React.useState('');
  const [result, setResult] = React.useState<PlateRecord[] | null>(null);

  const search = () => {
    fetch(Config.API_URL + '/records/' + encodeURIComponent(plate), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Config.API_KEY,
      },
    }).then(response => {
      response.json().then(data => {
        setResult(data);
        console.log(data);
      });
    });
  };

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
          Plaka Sorgulama
        </Text>
        {result ? (
          <>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 30,
                fontSize: 20,
                color: isDark ? '#A7ACBD' : '#4D5157',
              }}>
              {plate} Sorgusu
            </Text>
            <SearchResult records={result} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Button
                style={{width: '48%', padding: 5}}
                icon="magnify"
                mode="contained-tonal"
                onPress={() => {
                  setResult(null);
                  setPlate('');
                }}>
                Yeni Sorgu
              </Button>
            </View>
          </>
        ) : (
          <>
            <TextInput
              style={{marginTop: 20}}
              label="Plaka"
              defaultValue={plate}
              onChangeText={text => setPlate(text)}
            />

            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Button
                style={{width: '48%', padding: 5}}
                icon="magnify"
                mode="contained-tonal"
                onPress={() => search()}>
                Ara
              </Button>
            </View>
          </>
        )}
        <View style={{marginTop: 70}}></View>
      </View>
    </>
  );
}
