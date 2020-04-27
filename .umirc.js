import { defineConfig } from 'umi';
import routes from './config/config.router';

export default defineConfig({
  routes,
  antd: {},
  dva: {},
  history: {
    type: 'hash',
  },
  define: {
    _DEV_: (process.env.NODE_ENV || 'development') === 'development',
    _PRD_: (process.env.NODE_ENV || 'production') === 'production',
  },
});
