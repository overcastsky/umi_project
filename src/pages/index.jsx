import React, { useEffect, useState } from 'react';
import { urls, services } from '../api';
import { SelfColumn } from '../components';
import styles from './index.less';
function Page() {
  const [dataSource, setDataSource] = useState(null);
  useEffect(() => {
    services.post(
      urls.copyIntent,
      {},
      data => {
        setDataSource(data);
      },
      error => {},
    );
  }, []);
  const config = {
    data: dataSource ? [dataSource, dataSource] : [],
    chartsType: 'DualAxes',
    xField: 'time',
    yField: ['value', 'count'],
    meta: {
      time: { alias: '年份' },
      value: { alias: '百分点' },
      count: { alias: '值' },
    },
    customerOption: {
      geometryOptions: [
        {
          geometry: 'column',
          columnWidthRatio: 0.2,
        },
        {
          geometry: 'line',
          lineStyle: { lineWidth: 2 },
        },
      ],
    },
  };
  return <SelfColumn id="demo" {...config} />;
}

export default Page;
