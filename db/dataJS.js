let _data = {
  'Racket Sports': [
    { name: 'Tennis Balls', id: 1},
    { name: 'Racketball balls', id: 2},
    { name: 'Head Rackets', id: 3},
    { name: 'Phantom Rackets', id: 4}
  ],
  'Music': [
    { name: 'Gibson Guitars', id: 1},
    { name: 'Korg Pianos', id: 2},
    { name: 'Yamaha Guitars', id: 3}
  ]
}

// .......Category focused methods:

const listCat = function (name) {
  if (name) {
    return _data[name];
  } else {
    return _data;
  }
}

const addCat = function (name) {
  let keyNames = Object.keys(_data);
  if (!keyNames.includes(name) && name && name.toLowerCase() !== 'home' && name.length < 23) {
    _data[name] = [];
    return [];
  }
}

const removeCat = function (name) {
  let keyNames = Object.keys(_data), resultObj = {};
  keyNames.forEach(keyName => {
    if (keyName !== name) resultObj[keyName] = _data[keyName];
  })
  _data = resultObj;
}

const changeCat = function (name, nameChg) {
  let keyNames = Object.keys(_data), resultObj = {};
  keyNames.forEach(keyName => {
    if (keyName === name && nameChg && nameChg.toLowerCase() !== 'home' && nameChg.length < 23) resultObj[nameChg] = _data[keyName];
    else resultObj[keyName] = _data[keyName];
  })
  _data = resultObj;
}

// .......Product focused methods:

const addProd = function (name, category) {
  let productObjects = _data[category];
  let keyNames = productObjects.map(product => {
    return product.name
  })
  if (!keyNames.includes(name) && name && name.toLowerCase() !== 'home' && name.length < 23) {
    //get a new id:
    let maxId = productObjects.reduce((max, product) => {
      if (product.id > max) return product.id;
    }, 0) + 1;
    _data[category].push({ name, id: maxId });
    return true
  }
}

const removeProd = function (id, category) {
  id = id * 1;
  _data[category] = _data[category].filter(product => product.id !== id);
}

const changeProd = function (id, nameChg, category) {
  id = id * 1;
  let productObjects = _data[category];
  let keyNames = productObjects.map(product => {
    return product.name
  })
  if (!keyNames.includes(nameChg) && nameChg && nameChg.toLowerCase() !== 'home' && nameChg.length < 23) {
    _data[category] = _data[category].filter(product => {
      if (product.id === id) product.name = nameChg;
      return product;
    })
  }
}

module.exports = { addCat, changeCat, removeCat, listCat, addProd, changeProd, removeProd };
