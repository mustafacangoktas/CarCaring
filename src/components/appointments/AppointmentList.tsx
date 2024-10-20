import * as React from 'react';
import {DataTable} from 'react-native-paper';
import {useEffect} from 'react';
import {PlateRecord} from '../search/SearchResult.tsx';
import Util from '../../util.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Editor from '../services/Editor.tsx';
import {Service} from '../services/ServiceList.tsx';
import SearchViewer from '../search/SearchViewer.tsx';

export type Appointment = {
  appointment: Date;
} & PlateRecord;

const AppointmentList = ({appointments}: {appointments: Appointment[]}) => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([10, 20, 50]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const [to, setTo] = React.useState(0);
  const [from, setFrom] = React.useState(0);
  const [viewerVisible, setViewerVisible] = React.useState(false);
  const [viewerData, setViewerData] = React.useState<PlateRecord | null>(null);
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    setTo(Math.min((page + 1) * itemsPerPage, appointments.length));
    setFrom(page * itemsPerPage);
  }, [page, itemsPerPage, appointments]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <SearchViewer
        show={viewerVisible}
        defaultData={viewerData}
        setShown={setViewerVisible}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>İsim Soyisim</DataTable.Title>
          <DataTable.Title>Tarih</DataTable.Title>
          <DataTable.Title
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            İncele
          </DataTable.Title>
        </DataTable.Header>
        {appointments.slice(from, to).map(item => (
          <DataTable.Row key={`${item.brand}-${item.model}`}>
            <DataTable.Cell>
              {item.name} {item.surname}
            </DataTable.Cell>
            <DataTable.Cell>{Util.prettyDate(item.appointment)}</DataTable.Cell>
            <DataTable.Cell
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Icon
                size={20}
                name="newspaper-variant-outline"
                onPress={() => {
                  setViewerData(item);
                  setViewerVisible(false);
                  setTimeout(() => {
                    setViewerVisible(true);
                  }, 100);
                }}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(appointments.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`Sayfa ${page + 1}/${Math.ceil(
            appointments.length / itemsPerPage,
          )}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Adet Seç'}
        />
      </DataTable>
    </>
  );
};

export default AppointmentList;
