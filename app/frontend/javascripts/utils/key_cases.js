let onlyCallOnObject = (func, data) => {
  if (typeof data !== 'object') { return data; }
  if (data instanceof Array) { return data.map(_.partial(onlyCallOnObject, func)); }
  return func(data);
};

let deepSnakeKeys = _.partial(onlyCallOnObject, data => {
  return _(data).map((v, k) => [_.snakeCase(k), deepSnakeKeys(v)]).object().value();
});

let deepCamelKeys = _.partial(onlyCallOnObject, data => {
  return _(data).map((v, k) => [_.camelCase(k), deepCamelKeys(v)]).object().value();
});

module.exports = {
  deepCamelKeys,
  deepSnakeKeys
};
