import { isArray } from 'util';

/**
 * 是否是对象
 * @param { Object } obj
 * @return { Boolean }
 * **/

function isObject(obj) {
  const type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
}

function isEmptyArr(arr) {
  return !arr || arr.length === 0;
}

function isEmptyObj(obj) {
  return !obj || Object.keys(obj).length === 0;
}

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

export { isObject, isEmptyArr, isEmptyObj, isEmptyData };
