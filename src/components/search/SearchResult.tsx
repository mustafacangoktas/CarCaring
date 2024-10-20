import {ScrollView, View, Appearance} from 'react-native';
import {Button, Checkbox, DataTable, Text, TextInput} from 'react-native-paper';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchViewer from './SearchViewer.tsx';
import Util from '../../util.ts';

export type PlateRecord = {
  _id?: string;
  plate: string;
  name: string;
  surname: string;
  phone: string;
  brand: string;
  model: string;
  appointment: Date;
  operations: {name: string; price: number}[];
  date: string;
};

export default function SearchResult(props: {records: PlateRecord[]}) {
  const colorScheme = Appearance.getColorScheme();
  const isDark = colorScheme === 'dark';

  const [items, setItems] = React.useState<PlateRecord[]>(props.records);
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([5, 10, 20]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const [viewerData, setViewerData] = React.useState<PlateRecord | null>(null);
  const [viewerVisible, setViewerVisible] = React.useState(false);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <SearchViewer show={viewerVisible} defaultData={viewerData} setShown={setViewerVisible} />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>İsim - Soyisim</DataTable.Title>
          <DataTable.Title>Araç</DataTable.Title>
          <DataTable.Title>Tarih</DataTable.Title>
          <DataTable.Title>İşlemler</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map(item => (
          <DataTable.Row key={`${item.plate}-${item.name}`}>
            <DataTable.Cell>
              {item.name} {item.surname}
            </DataTable.Cell>
            <DataTable.Cell>
              {item.brand} {item.model}
            </DataTable.Cell>
            <DataTable.Cell>{Util.prettyDate(item.date)} {Util.prettyTime(item.date)}
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Icon
                size={20}
                name="newspaper-variant-outline"
                onPress={() => {
                  setViewerData(item);
                  setViewerVisible(true);
                }}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`Sayfa ${page + 1}/${Math.ceil(items.length / itemsPerPage)}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Adet Seç'}
        />
      </DataTable>
      <View style={{marginTop: 70}}></View>
    </>
  );
}
