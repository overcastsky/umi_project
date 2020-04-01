import { defineConfig } from 'umi';
import routes from './config/config.router';
// development
// production
// TEST
// process.env.NODE_ENV
const UMI_ENV = process.env.NODE_ENV;

export default defineConfig({
  routes,
  define: {},
});
