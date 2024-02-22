export const environment = {
  production: true,
  api: (localStorage.getItem('activeServer') ? localStorage.getItem('activeServer') : 'http://localhost') + '/hs/api',
};
