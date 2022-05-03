import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import '../styles/Data.css';
import { Button } from '@mui/material';
import { getItemFromLocalStorage } from '../services/storageService';

export default function ManageRoomsData(props) {
  const [tableData, setTableData] = React.useState([]);
  const { data, openManageRoom } = props;

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const columns = [
    {
      field: 'location',
      headerName: 'Location',
      minWidth: 100,
      flex: 1,
    },
    { field: 'roomName', headerName: 'Room', minWidth: 100, flex: 1 },
    {
      field: 'startDateStr',
      headerName: 'Start Date',
      width: 100,
    },
    {
      field: 'endDateStr',
      headerName: 'End Date',
      width: 100,
    },
    { field: 'roomType', headerName: 'Room Type', minWidth: 100, flex: 1 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'action ',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              className="openRoom"
              variant="action-button"
              onClick={() => openManageRoom(params.row)}
            >
              Manage
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <DataGrid
        className="common-border"
        rows={tableData}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        disableColumnMenu="true"
      />
    </div>
  );
}

ManageRoomsData.propTypes = {
  data: PropTypes.any,
  openManageRoom: PropTypes.func,
};
