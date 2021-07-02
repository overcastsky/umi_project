export default config => {
  config.module.rules.delete('svg');
  config.resolve.alias
    .set('utils', require.resolve('../utils/utils.jsx'))
    .set('api', require.resolve('../src/api'))
    .set('components', require.resolve('../src/components'));
  config.module
    .rule('svg')
    .test(/\.svg(\?v=\d+\.\d+\.\d+)?$/)
    .use([
      {
        loader: 'babel-loader',
      },
      {
        loader: '@svgr/webpack',
        options: {
          babel: false,
          icon: false,
        },
      },
    ])
    .loader(require.resolve('@svgr/webpack'));
};
