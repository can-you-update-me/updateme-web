angular.module('updateme')
.factory('LocalStorage', function($window) {
  let LS = $window.localStorage;

  class LocalStorage {
    constructor(namespace) {
      this.namespace = namespace;
    }

    get(key, defaultValue = null) {
      return JSON.parse(LS.getItem(this.storeKey(key))) || defaultValue;
    }

    put(key, value) {
      return LS.setItem(this.storeKey(key), JSON.stringify(value));
    }

    storeKey(key) {
      return `${this.namespace}/${key}`;
    }
  }

  return function(namespace) {
    return new LocalStorage(namespace);
  };
});
