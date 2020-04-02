import axios from 'axios';
import { isObject } from '../../utils/utils';
import { message } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限，（令牌、用户名、密码错误）',
  403: '用户得到授权,但是访问是被禁止的',
  404: '发出的请求针对的是不存在的记录,服务器没有进行操作',
  406: '请求的格式不可得',
  408: '请求超时',
  410: '请求的资源被永久删除,且不会在得到',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误,请检查服务器',
  502: '网关错误',
  503: '服务不可用,服务器暂时过载或维护',
  504: '网关超时',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorMsg = codeMessage[response.status] || response.statusText;
  message.warning(errorMsg, 2);
  error.name = response.status;
  error.response = response;
  throw error;
};

const request = (config, resolve, reject) => {
  const newConfig = { ...config };
  newConfig.headers = {
    Accept: 'application/json',
    'Content-type': 'application/json; charset=utf-8',
    ...newConfig.headers,
  };
  axios
    .request(newConfig)
    .then(checkStatus)
    .then(
      response => {
        const { data, status } = response;
        if (data.resultCode === '000000') {
          typeof resolve === 'function' && resolve(data.data);
        } else {
          console.log('-------------reject--------------', response);
          // 数据异常
          typeof reject === 'function' && reject(data, status || 200);
        }
      },
      errResponse => {
        // 服务端异常场景
        const { response, request, status } = errResponse;
        const statusCode = status || response.status || request.status;
        const errData = {
          data: null,
          resultCode: statusCode,
          resultMesg: codeMessage[statusCode],
        };
        if (response && response.data && isObject(response.data)) {
          console.log('服务端异常, 有返回参数', response, request, status);
          typeof reject === 'function' && reject(response.data, statusCode);
        } else {
          console.log('服务端异常, 无返回参数', response, request, status);
          typeof reject === 'function' && reject(errData, statusCode);
        }
      },
    )
    .catch(error => {
      console.log('catch-error', error);
    });
};

export default {
  get: (url, params, resolve, reject) => {
    request(
      {
        method: 'GET',
        url,
        params,
      },
      resolve,
      reject,
    );
  },
  post: (url, data, resolve, reject) => {
    request(
      {
        method: 'POST',
        url,
        data,
      },
      resolve,
      reject,
    );
  },
  request: config => {
    axios.request(config).then(response => {
      console.log('response', response);
    });
  },
};
