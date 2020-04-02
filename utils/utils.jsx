/**
 * 是否是对象
 * @param { Object } obj
 * @return { Boolean }
 * **/

function isObject(obj) {
  const type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
}

export { isObject };
