import React from 'react';
import {
  Column,
  RangeColumn,
  GroupedColumn,
  StackedColumn,
  PercentStackedColumn,
  Line,
  Bar,
  GroupedBar,
  StackedBar,
  ColumnLine,
  StackedColumnLine,
} from '@ant-design/charts';
import { ChartsConfig } from '../config';
import { isEmptyData } from '../../../../utils/utils';
import { SelfEmpty } from '../../index';

class SelfColumn extends React.Component {
  renderCharts = type => {
    const { data = [], xField, yField, meta = {}, customerOption } = this.props;
    return {
      ...ChartsConfig({ data, xField, yField, meta, customerOption })[type],
    };
  };
  ColumnType = chartsType => {
    let charts = null;
    switch (chartsType) {
      case 'column':
        charts = <Column {...this.renderCharts('chartResource')} />;
        break;
      case 'RangeColumn':
        charts = <RangeColumn {...this.renderCharts('chartResource')} />;
        break;
      case 'GroupedColumn':
        charts = <GroupedColumn {...this.renderCharts('chartResource')} />;
        break;
      case 'StackedColumn':
        charts = <StackedColumn {...this.renderCharts('chartResource')} />;
        break;
      case 'PercentStackedColumn':
        charts = (
          <PercentStackedColumn {...this.renderCharts('chartResource')} />
        );
        break;
      case 'Line':
        charts = <Line {...this.renderCharts('chartResource')} />;
        break;
      case 'Bar':
        charts = <Bar {...this.renderCharts('chartResource')} />;
        break;
      case 'GroupedBar':
        charts = <GroupedBar {...this.renderCharts('chartResource')} />;
        break;
      case 'StackedBar':
        charts = <StackedBar {...this.renderCharts('chartResource')} />;
        break;
      case 'ColumnLine':
        charts = <ColumnLine {...this.renderCharts('chartResource')} />;
        break;
      case 'StackedColumnLine':
        charts = <StackedColumnLine {...this.renderCharts('chartResource')} />;
        break;
    }
    return charts;
  };
  render() {
    const { chartsType, height = 400, data, id } = this.props;
    return (
      <div style={{ width: '100%', height }} id={id}>
        {!isEmptyData(data) ? this.ColumnType(chartsType) : <SelfEmpty />}
      </div>
    );
  }
}

export default SelfColumn;
