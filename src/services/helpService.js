import httpService from './httpService';

const auth = async (username, password) => {
  const { data } = await httpService.post('/user/login', {
    username: username,
    password: password,
  });
  return data;
};

const getLocations = async () => {
  const { data } = await httpService.get('/location');
  return data;
};

const getRoomTypes = async () => {
  const { data } = await httpService.get('/filter/room-types');
  return data;
};

const getRoomStatus = async () => {
  const { data } = await httpService.get('/filter/room-status');
  return data;
};

const getAllProviders = async () => {
  const { data } = await httpService.get('/filter/providers');
  return data;
};

const getAvilableProviders = async (assignedRoomVO) => {
  const { data } = await httpService.post('/filter/providers', assignedRoomVO);
  return data;
};

const getAllRooms = async () => {
  const { data } = await httpService.get('/filter/rooms');
  return data;
};

const getAllAssignedRooms = async (filters) => {
  const { data } = await httpService.post('/room/assigned', filters);
  return data;
};

const getManagedRooms = async (filters) => {
  const { data } = await httpService.post('/room/managed', filters);
  return data;
};

const getAuditDetails = async (filters) => {
  const { data } = await httpService.post('/room/audit', filters);
  return data;
};

const getRoomsByLocationIds = async (locations) => {
  const { data } = await httpService.get(`/room/location/${locations}`);
  return data;
};

const assignProviderToRoom = async (assignProvider) => {
  const { data } = await httpService.post(
    '/room/assigne-provider',
    assignProvider
  );
  return data;
};

export default {
  auth,
  getLocations,
  getAllRooms,
  getRoomsByLocationIds,
  getRoomTypes,
  getRoomStatus,
  getAllProviders,
  getAllAssignedRooms,
  getManagedRooms,
  assignProviderToRoom,
  getAvilableProviders,
  getAuditDetails,
};
