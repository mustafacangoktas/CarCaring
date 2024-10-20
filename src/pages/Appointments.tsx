import {ScrollView, View, Appearance} from 'react-native';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import Config from '../config.ts';
import AppointmentList, {
  Appointment,
} from '../components/appointments/AppointmentList.tsx';
import Util from '../util.ts';
import DatePicker from 'react-native-date-picker';

export default function Appointments() {
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'dark';

  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const fetchAppointments = () => {
    fetch(
      Config.API_URL +
        '/records/appointments' +
        (date ? `/${encodeURIComponent(date.toISOString())}` : ''),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Config.API_KEY,
        },
      },
    ).then(response => {
      response.json().then(data => {
        setAppointments(data);
        console.log(data);
      });
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, [date]);

  return (
    <>
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
          Randevular
        </Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'left',
                marginBottom: 10,
                color: isDark ? '#A7ACBD' : '#4D5157',
              }}>
              {date ? 'Seçili Tarih' : 'Yaklaşan Randevular'}
            </Text>
            <Button
              mode={'contained'}
              style={{padding: 5, maxWidth: 300}}
              onPress={() => setOpen(true)}>
              {date ? Util.prettyDate(date) : 'Tarih Seç'}
            </Button>
          </View>
          <DatePicker
            modal
            mode="date"
            title={'Tarih Seç'}
            open={open}
            date={date ?? new Date()}
            onConfirm={date => {
              setOpen(false);
              date.setUTCHours(0, 0, 0, 0);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <AppointmentList appointments={appointments} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            style={{width: '100%', padding: 5, marginTop: 20, maxWidth: 300}}
            icon="refresh"
            mode="contained-tonal"
            onPress={() => {
              setDate(null);
              fetchAppointments();
            }}>
            Yenile
          </Button>
        </View>
        <View style={{marginTop: 70}}></View>
      </ScrollView>
    </>
  );
}
