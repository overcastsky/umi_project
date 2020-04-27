import UrlModules from './reducerUrls';

function initHostName() {
  if (_DEV_) {
    return {
      domainName: '',
      suffix: '',
    };
  }
  if (_PRD_) {
    return {
      domainName: '生产',
      suffix: '',
    };
  }
}

// 初始化域名
const hostName = initHostName();
let urls = {};

UrlModules.map(v => {
  Object.keys(v).forEach(key => {
    urls[key] = `${hostName.domainName}${v[key]}${hostName.suffix}`;
  });
});

export default urls;
