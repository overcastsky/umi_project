import moment from 'moment';
/**
 * 是否是对象
 * @param { Object } obj
 * @return { Boolean }
 * **/
function isObject(obj) {
  const type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
}

/**
 * 是否是字符串
 * @param { String } str
 * @return { Boolean }
 * **/
function isString(str) {
  return toString.call(str) === '[Object String]';
}

/**
 * 是否是数字类型
 * @param { Number } num
 * @return { Boolean }
 * **/
function isNumber(num) {
  return toString.call(num) === '[Object Number]';
}

/**
 * 是否是数组
 * @param { Array } arr
 * @return { Boolean }
 * **/
function isArray(arr) {
  return Array.isArray(arr);
}

/**
 * 是否是空数组
 * @param { Array } arr
 * @return { Boolean }
 * **/
function isEmptyArr(arr) {
  return !arr || arr.length === 0;
}

/**
 * 是否是空对象
 * @param { Object } obj
 * @return { Boolean }
 * **/
function isEmptyObj(obj) {
  return !obj || Object.keys(obj).length === 0;
}

/**
 * 变量是否为空
 * @param any
 * @return { Boolean }
 * **/
function isEmptyData(data) {
  if (!data) {
    return true;
  } else if (isArray(data) && isEmptyArr(data)) {
    return true;
  } else if (isObject(data) && isEmptyObj(data)) {
    return true;
  }
  return false;
}

/**
 * 补零
 * @param {Number, String} val
 * @return { Number }
 * **/
function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

/**
 * 转换千分位
 * @param { Number, String } val
 * @return { String }
 * **/
function parseNumber(val) {
  const re = /(?=(?!\b)(\d{3})+$)/g;
  return val.replace(re, ',');
}

/**
 * 对象的每一个key是否都为空
 * @param { Object } obj
 * @return { Boolean }
 * **/
function isEmptyKey(obj) {
  for (let i in obj) {
    if (obj[i]) return false;
  }
  return true;
}

/**
 * 去除空格
 * @param { String } value
 * @return { String }
 * **/
function Trim(value) {
  return value.replace(/\s+/g, '');
}

/**
 * 格式化时间
 * @param { Array } arr
 * @return { String }
 * **/
function disposeDate(arr, format = 'YYYY-MM-DD') {
  let arrs = [];
  !isEmptyData(arr) &&
    arr.forEach(key => {
      arrs.push(moment(key).format(format));
    });
  return arrs;
}

/**
 * 解析URL
 * @param { String } url
 * @return { Object }
 * **/
function parseQueryString(url) {
  url = !url ? window.location.href : url;
  if (url.indexOf('?') === -1) {
    return {};
  }
  let search =
    url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1);
  if (search === '') {
    return {};
  }
  search = search.split('&');

  let query = {};
  for (let i = 0; i < search.length; i++) {
    let pair = search[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

export {
  isObject,
  isArray,
  isEmptyArr,
  isEmptyObj,
  isEmptyData,
  fixedZero,
  parseNumber,
  isString,
  isNumber,
  isEmptyKey,
  Trim,
  disposeDate,
  parseQueryString,
};
