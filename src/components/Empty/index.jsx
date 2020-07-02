import React from 'react';
import { Empty } from 'antd';
import style from './index.less';

function SelfEmpty() {
  return (
    <div className={style.empty}>
      <Empty description={'暂无数据'} />
    </div>
  );
}

export default SelfEmpty;
