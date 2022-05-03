import React, { useState } from 'react';
import {
  Grid,
  Dialog,
  DialogContentText,
  DialogContent,
  Button,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import { GridCloseIcon } from '@mui/x-data-grid';

const ManageRoomsDialog = (props) => {
  const { items, open, onManage, handleClose, manageRow } = props;
  const [value, setValue] = useState();
  const [selectedValue, setSelectedValue] = useState(0);

  React.useEffect(() => {
    setSelectedValueToProvider();
  }, [items, manageRow]);

  const setSelectedValueToProvider = async () => {
    if (manageRow) {
      setValue(manageRow.roomTypeId);
      const val = items.find((item) => item.value === manageRow?.roomTypeId);
      await setSelectedValue(val);
    }
  };

  const handleChange = (values) => {
    setValue(values.value);
    const val = items.find((item) => item.value === values.value);

    setSelectedValue(val);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
        <DialogTitle id="alert-dialog-title" className="dialogTitle">
          Manage Room
          <IconButton onClick={handleClose}>
            <GridCloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <b>
                  Room Name: {manageRow?.roomName} &nbsp;Date:&nbsp;
                  {manageRow?.startDate}
                </b>
              </Grid>
              <Grid item xs={12}>
                <Select
                  name="name"
                  options={items}
                  onChange={handleChange}
                  value={selectedValue}
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button
                  className="openRoom"
                  variant="action-button"
                  onClick={() => onManage(value, manageRow)}
                  style={{ marginLeft: '5px' }}
                  disabled={value === manageRow?.roomTypeId}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

ManageRoomsDialog.propTypes = {
  items: PropTypes.any,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onManage: PropTypes.func,
  manageRow: PropTypes.any,
};

export default ManageRoomsDialog;
