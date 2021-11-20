export const GLOBALTYPES = {
  AUTH: 'AUTH',
  ALERT: 'ALERT',
  ALERTPOST: 'ALERTPOST',
  THEME: 'THEME',
  STATUS: 'STATUS',
  MODAL: 'MODAL',
  SOCKET: 'SOCKET',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  CALL: 'CALL',
  PEER: 'PEER',
  CHECK_ON_OFF: 'CHECK_ON_OFF',
  UPDATE_USER: 'UPDATE_USER'
};

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return newData;
};

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};
