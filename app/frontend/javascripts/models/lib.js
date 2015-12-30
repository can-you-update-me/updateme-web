angular.module('updateme')
.factory('Lib', function($http) {
  let Lib = {
    list: (type) => $http.get(`/api/libs/${type}`),
    create: (params) => $http.post('/api/libs', params),
    scout: (lib) => $http.post(`/api/libs/${lib.id}/scout`),
    preview: (params) => $http.post(`/api/libs/preview`, params)
  };

  return Lib;
})
.factory('libTypes', function() {
  let libTypes = [
    {
      name: 'Ruby Gem',
      fontClass: 'devicon-ruby-plain'
    },
    {
      name: 'JS Package',
      fontClass: 'devicon-javascript-plain'
    },
    {
      name: 'Python Package',
      fontClass: 'devicon-python-plain'
    },
    {
      name: 'GitHub Repo',
      fontClass: 'fa fa-github'
    },
    {
      name: 'Rust Crate',
      icon: 'https://www.rust-lang.org/logos/rust-logo-blk.svg',
      iconClass: 'rust-icon'
    }
  ];

  libTypes.forEach(libType => {
    libType.key = _.kebabCase(libType.name.toLowerCase());
  });

  return libTypes;
});
