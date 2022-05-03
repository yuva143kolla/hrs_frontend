import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import '../styles/Data.css';
import { getItemFromLocalStorage } from '../services/storageService';

export default function AuditData(props) {
  const [tableData, setTableData] = React.useState([]);
  const { data } = props;

  const loginUser = getItemFromLocalStorage('user');

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const columns = [
    {
      field: 'roomName',
      headerName: 'Room',
      minWidth: 120,
    },
    { field: 'location', headerName: 'Location', minWidth: 120 },
    {
      field: 'dateStr',
      headerName: 'Date',
      width: 150,
    },
    { field: 'user', headerName: 'User Name', minWidth: 50 },
    { field: 'action', headerName: 'Action', width: 150 },
    {
      field: 'comments',
      headerName: 'Comments',
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <div dangerouslySetInnerHTML={{ __html: params.row.comments }} />
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

AuditData.propTypes = {
  data: PropTypes.any,
};
