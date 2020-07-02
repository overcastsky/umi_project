function ChartsConfig({ data, xField, yField, meta = {}, customerOption }) {
  return {
    chartResource: {
      forceFit: true,
      data,
      padding: 'auto',
      xField,
      yField,
      meta,
      ...customerOption,
    },
  };
}

export { ChartsConfig };
