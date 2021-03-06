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

const AssignProviderDialog = (props) => {
  const { items, open, onAssign, handleClose, assignRow, openTime } = props;
  const [value, setValue] = useState();
  const [selectedValue, setSelectedValue] = useState(0);
  const [disabled, setDisabled] = useState(false);

  React.useEffect(() => {
    setDisabled(false);
    setSelectedValue(0);
    setSelectedValueToProvider();
  }, [openTime, items, assignRow]);

  const setSelectedValueToProvider = async () => {
    if (assignRow) {
      setValue(assignRow.providerId);
      const val = items.find((item) => item.value === assignRow?.providerId);
      await setSelectedValue(val);
    }
  };

  const handleChange = (values) => {
    setValue(values.value);
    const val = items.find((item) => item.value === values.value);

    setSelectedValue(val);
  };

  const handleRemove = () => {
    setDisabled(true);
    onAssign(0, assignRow);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
        <DialogTitle id="alert-dialog-title" className="dialogTitle">
          Assign Provider
          <IconButton onClick={handleClose}>
            <GridCloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <b>
                  Room Name: {assignRow?.roomName} &nbsp;Date:&nbsp;
                  {assignRow?.startDateStr}&nbsp; Session:&nbsp;
                  {assignRow?.session}
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
                  onClick={() => {
                    setDisabled(true);
                    onAssign(value, assignRow);
                  }}
                  style={{ marginLeft: '5px' }}
                  disabled={disabled || value === assignRow?.providerId}
                >
                  Assign
                </Button>

                {assignRow?.provider ? (
                  <Button
                    className="bookedRoom"
                    variant="action-button"
                    onClick={handleRemove}
                    disabled={disabled}
                    style={{ marginLeft: '5px' }}
                  >
                    Remove
                  </Button>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

AssignProviderDialog.propTypes = {
  items: PropTypes.any,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onAssign: PropTypes.func,
  assignRow: PropTypes.any,
  openTime: PropTypes.any,
};

export default AssignProviderDialog;
