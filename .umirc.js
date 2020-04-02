import { defineConfig } from 'umi';
import routes from './config/config.router';

export default defineConfig({
  routes,
  antd: {},
  history: {
    type: 'hash',
  },
  define: {
    _DEV_: (process.env.NODE_ENV || 'development') === 'development',
    _TEST_: (process.env.NODE_ENV || 'TEST') === 'TEST',
    _PRD_: (process.env.NODE_ENV || 'production') === 'production',
  },
});
