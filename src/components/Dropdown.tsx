import {Button, Menu, Searchbar, Surface, Text} from 'react-native-paper';
import {Appearance, ScrollView, useWindowDimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

type Props = {
  placeholder: string;
  value?: string;
  setValue: (value: string) => void;
  items: {label: string; value: string}[];
};

export default function Dropdown(props: Props) {
  const [value, setValue] = React.useState(props.value ? props.value : '');
  const [visible, setVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const windowWidth = useWindowDimensions().width;
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Surface
      style={{
        shadowColor: 'transparent',
        backgroundColor: isDark ? '#474A58' : '#DEE9EA',
        borderBottomWidth: 1,
        borderBottomColor: isDark ? '#B9D1FF' : '#949A9F',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        height: 55,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        width: '100%',
      }}
      elevation={5}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            style={{
              marginBottom: 5,
              width: windowWidth - 60,
              borderRadius: 0,
            }}
            onPress={() => setVisible(true)}>
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth - 90,
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: isDark ? '#A7ACBD' : '#4D5157',
                  textAlign: 'left',
                  fontSize: 16,
                }}>
                {value
                  ? props.items.find(item => item.value === value)?.label
                  : props.placeholder}
              </Text>
              <Icon
                name={visible ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={isDark ? "#A7ACBD" : '#4D5157'}
              />
            </View>
          </Button>
        }>
        <View>
          <View>
            <Searchbar
              style={{
                marginRight: 5,
                marginLeft: 5,
                borderRadius: 2,
              }}
              placeholder="Ara..."
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
          <ScrollView style={{maxHeight: 200, minWidth: 240}}>
            {props.items
              .filter(item =>
                item.label.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((item, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setValue(item.value);
                    props.setValue(item.value);
                    setVisible(false);
                  }}
                  title={item.label}
                />
              ))}
          </ScrollView>
        </View>
      </Menu>
    </Surface>
  );
}
