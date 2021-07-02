import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { urls, services } from 'api';
import { SelfColumn } from '../components';
import styles from './index.less';
function Page() {
  const onSearch = value => {
    console.log(value);
  };

  const onReset = () => {
    console.log('onReset');
  };
  const searchProps = {
    type: 'ModelSearch',
    colNum: 3, // 根据配置的当前查询子项的个数 -1；
    onSearch: onSearch,
    onReset: onReset,
    search: {
      slurSearch: urls.copyIntent,
      slurCode: 'id',
    },
  };
  return <Search {...searchProps} />;
}

export default Page;
