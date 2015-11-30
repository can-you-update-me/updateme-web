angular.module('updateme')
.factory('Lib', function($http) {
  let Lib = {
    list: (type) => $http.get(`/api/libs/${type}`),
    create: (params) => $http.post('/api/libs', params),
    scout: (lib) => $http.post(`/api/libs/${lib.id}/scout`),
    preview: (params) => $http.post(`/api/libs/preview`, params)
  };

  return Lib;
});
