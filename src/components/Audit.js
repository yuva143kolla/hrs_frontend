import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import useWindowDimensions from './common/useWindowDimensions';
import Spinner from './common/DefaultSpinner';
import helpService from '../services/helpService';
import MultiselectDropDown from './common/MultiSelectDropDown';
import AuditData from './AuditData';

function Audit() {
  const [dLocations, setDLocations] = useState([]);
  const [dRooms, setDRooms] = useState([]);

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    locations: [],
    rooms: [],
  });

  const [sDate, setSDate] = useState(null);
  const [eDate, setEDate] = useState(null);
  const [locations, setLocations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [optLoading, setOptLoading] = useState(false);

  const { height } = useWindowDimensions();
  const divHeight = height - 175;

  React.useEffect(() => {
    handleSubmit();
  }, []);

  const handleLocation = async (values) => {
    await setLocations(values);
    await updateRoomOnLocation(values);
  };

  const updateRoomOnLocation = async (values) => {
    if (!values) {
      return;
    }
    const filterRooms = [];
    const allRooms = [];
    dLocations.forEach((location) => {
      if (values.includes(location.value) && location.rooms.length > 0) {
        location.rooms.forEach((a) => {
          allRooms.push(a.value);
        });
      }
    });

    rooms.forEach((room) => {
      allRooms.forEach((all) => {
        if (all == room) {
          filterRooms.push(room);
        }
      });
    });

    setRooms(filterRooms);
  };

  const handleOpenLocation = async () => {
    setOptLoading(dLocations?.length > 0 ? false : true);
    const locs = await helpService.getLocations();
    await setOptLoading(false);
    await setDLocations(locs);
  };

  const handleRooms = (values) => {
    setRooms(values);
  };

  const handleOpenRooms = async () => {
    var locationIds = '';
    if (locations && locations != '') {
      locationIds = locations.join(',');
      const rooms = await helpService.getRoomsByLocationIds(locationIds);
      setDRooms(rooms);
    } else {
      const rooms = await helpService.getAllRooms();
      setDRooms(rooms);
    }
  };

  const handleSubmit = async () => {
    const filterObj = {
      startDate: sDate,
      endDate: eDate,
      locations: locations,
      rooms: rooms,
    };
    await setFilters(filterObj);
    await setLoadData(false);
    const auditDetails = await helpService.getAuditDetails(filterObj);

    const data = await addDynamicId(auditDetails);
    setFilterData(data);
    setLoadData(true);
  };

  function addDynamicId(dataArr) {
    var count = 1;

    if (dataArr?.length > 0) {
      dataArr.map(function (item) {
        item.id = count;

        count++;
      });
      return dataArr;
    }
    return [];
  }

  return (
    <div style={{ margin: '0px 30px 10px 50px' }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          mt={2}
          style={{ padding: '5px' }}
          className="page-header"
          textAlign="center"
        >
          <Typography variant="h7">Audit Details</Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={3}>
              <Grid
                className="common-border"
                container
                spacing={2}
                style={{ paddingLeft: '0px', fontSize: '12px' }}
              >
                <Grid
                  item
                  xs={12}
                  style={{ maxHeight: divHeight, overflow: 'auto' }}
                >
                  <Grid container spacing={0.5}>
                    <Grid item xs={6}>
                      <LocalizationProvider
                        className="date_Picker"
                        dateAdapter={AdapterDateFns}
                      >
                        <DatePicker
                          label="Start Date"
                          value={sDate}
                          inputFormat="MM-dd-yyyy"
                          onChange={(newValue) => {
                            setSDate(newValue);
                            setEDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={{ width: '95%', maxWidth: '350px' }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        style={{ width: '350px' }}
                        className="date_Picker"
                      >
                        <DatePicker
                          label="End Date"
                          value={eDate}
                          inputFormat="MM-dd-yyyy"
                          onChange={(newValue) => {
                            setEDate(newValue);
                          }}
                          onError={() => {
                            setEDate(null);
                          }}
                          minDate={sDate}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={{ width: '95%', maxWidth: '350px' }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiselectDropDown
                        label="Location"
                        items={dLocations}
                        selectedOpts={locations}
                        handleSelection={handleLocation}
                        handleOpenSelect={handleOpenLocation}
                        loading={optLoading}
                      ></MultiselectDropDown>
                    </Grid>
                    <Grid item xs={12}>
                      <MultiselectDropDown
                        label="Rooms"
                        items={dRooms}
                        selectedOpts={rooms}
                        handleSelection={handleRooms}
                        handleOpenSelect={handleOpenRooms}
                      ></MultiselectDropDown>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  textAlign="center"
                  style={{ padding: '0px', marginTop: '10px' }}
                >
                  <Button
                    variant="submit"
                    style={{ width: '100%', borderRadius: '0px' }}
                    onClick={handleSubmit}
                    disabled={!loadData || optLoading}
                  >
                    SUBMIT
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={9}
              lg={9}
              style={{
                paddingTop: '10px',
                minHeight: divHeight + 50,
                paddingLeft: '8px',
              }}
            >
              <Grid container spacing={0} style={{ height: '100%' }}>
                <Grid item xs={12}>
                  {loadData ? (
                    <AuditData data={filterData}></AuditData>
                  ) : (
                    <Spinner></Spinner>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Audit;
