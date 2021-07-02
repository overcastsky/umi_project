import { defineConfig } from 'umi';
import routes from './config/config.router';
import chainWebpack from './config/chainWebpack';

export default defineConfig({
  routes,
  antd: {},
  dva: {},
  history: {
    type: 'hash',
  },
  proxy: {
    '/api': {
      target: '', // 后端服务url
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  publicPath: './',
  chainWebpack,
  define: {
    _DEV_: (process.env.UMI_ENV || 'dev') === 'dev',
    _TEST_: (process.env.UMI_ENV || 'test') === 'test',
    _PRD_: (process.env.UMI_ENV || 'prod') === 'prod',
  },
  extraPostCSSPlugins: [
    require('postcss-px-to-viewport')({
      viewportWidth: 1920, // 视窗的宽度，对应我们设计稿的宽度
      unitPrecision: 3, // 指定px转换为视窗单位值的小数位数
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，，建议使用vw
      selectorBlackList: [], // 指定不转换为视窗的类，可以自定义，可以无限添加，建议定义一两个通用的类名
      minPixeValue: 1, // 小于或等于1px不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: true, // 允许在媒体查询中转换px
      propList: ['!font*'],
    }),
  ],
});
