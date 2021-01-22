import React, { useEffect, useState } from 'react';
import {
  Column, // 柱状图
  Line, // 折线图
  Bar, // 条形图
  Area, // 面积图
  Pie, // 饼图
  DualAxes, // 混合图
} from '@ant-design/charts';
import { ChartsConfig } from '../config';
import { isEmptyData } from '../../../../utils/utils';
import { SelfEmpty } from '../../index';

function SelfColumn(props) {
  // 渲染图表
  function renderCharts(type) {
    const { data = [], xField, yField, meta = {}, customerOption = {} } = props;
    return {
      ...ChartsConfig({ data, xField, yField, meta, customerOption })[type],
    };
  }

  function ColumnType(chartsType) {
    let charts = null;
    switch (chartsType) {
      case 'column':
        charts = <Column {...renderCharts('chartResource')} />;
        break;
      case 'Line':
        charts = <Line {...renderCharts('chartResource')} />;
        break;
      case 'Bar':
        charts = <Bar {...renderCharts('chartResource')} />;
        break;
      case 'DualAxes':
        charts = <DualAxes {...renderCharts('chartResource')} />;
        break;
    }
    return charts;
  }
  const { width = '100%', height = 400, id, data, chartsType } = props;
  return (
    <div style={{ width, height }} id={id}>
      {isEmptyData(data) ? <SelfEmpty /> : ColumnType(chartsType)}
    </div>
  );
}

export default SelfColumn;
