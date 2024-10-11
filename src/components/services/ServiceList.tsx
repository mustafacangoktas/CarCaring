import * as React from 'react';
import {Button, DataTable} from 'react-native-paper';
import {useEffect} from 'react';
import Config from '../../config.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Editor from './Editor.tsx';
import {View} from 'react-native';

export type Service = {
  _id?: any;
  brand: string;
  model: string;
  operations: {
    name: string;
    price: number;
  }[];
};

const ServiceList = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([10, 20, 50]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const [items, setItems] = React.useState<Service[]>([]);
  const [editorVisible, setEditorVisible] = React.useState(false);
  const [editorData, setEditorData] = React.useState<Service | null>(null);
  const [refresh, setRefresh] = React.useState(false);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

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

  return (
    <>
      <Editor show={editorVisible} defaultData={editorData} setRefresh={setRefresh} />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Marka</DataTable.Title>
          <DataTable.Title>Model</DataTable.Title>
          <DataTable.Title numeric>Hizmetler</DataTable.Title>
          <DataTable.Title>İşlemler</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map(item => (
          <DataTable.Row key={`${item.brand}-${item.model}`}>
            <DataTable.Cell>{item.brand}</DataTable.Cell>
            <DataTable.Cell>{item.model}</DataTable.Cell>
            <DataTable.Cell numeric>{item.operations.length}</DataTable.Cell>
            <DataTable.Cell>
              <Icon
                size={20}
                name="pencil"
                onPress={() => {
                  setEditorData(item);
                  setEditorVisible(true);
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
          selectPageDropdownLabel={'Sayfa Seç'}
        />
      </DataTable>

      <View
        style={{
          marginTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Button
          style={{width: '48%', padding: 5}}
          icon="plus"
          mode="contained-tonal"
          onPress={() => {
            setEditorData(null);
            setEditorVisible(true);
          }}>
          Hizmet Ekle
        </Button>
      </View>
    </>
  );
};

export default ServiceList;
