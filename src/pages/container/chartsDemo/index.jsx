import React from 'react';
import { SelfColumn } from '../../../components';
import { Button } from 'antd';
const updateData = [
  {
    type: '家具家电',
    sales: 310,
  },
  {
    type: '粮油副食',
    sales: 280,
  },
  {
    type: '生鲜水果',
    sales: 161,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 408,
  },
  {
    type: '进口食品',
    sales: 308,
  },
  {
    type: '食品饮料',
    sales: 238,
  },
  {
    type: '家庭清洁',
    sales: 138,
  },
];
const data = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];

const rangeData = [
  {
    type: '分类一',
    values: [76, 100],
  },
  {
    type: '分类二',
    values: [56, 108],
  },
  {
    type: '分类三',
    values: [38, 129],
  },
  {
    type: '分类四',
    values: [58, 155],
  },
  {
    type: '分类五',
    values: [45, 120],
  },
  {
    type: '分类六',
    values: [23, 99],
  },
  {
    type: '分类七',
    values: [18, 56],
  },
  {
    type: '分类八',
    values: [18, 34],
  },
];

const grounpData = [
  {
    name: 'London',
    月份: 'Jan.',
    月均降雨量: 18.9,
  },
  {
    name: 'London',
    月份: 'Feb.',
    月均降雨量: 28.8,
  },
  {
    name: 'London',
    月份: 'Mar.',
    月均降雨量: 39.3,
  },
  {
    name: 'London',
    月份: 'Apr.',
    月均降雨量: 81.4,
  },
  {
    name: 'London',
    月份: 'May',
    月均降雨量: 47,
  },
  {
    name: 'London',
    月份: 'Jun.',
    月均降雨量: 20.3,
  },
  {
    name: 'London',
    月份: 'Jul.',
    月均降雨量: 24,
  },
  {
    name: 'London',
    月份: 'Aug.',
    月均降雨量: 35.6,
  },
  {
    name: 'Berlin',
    月份: 'Jan.',
    月均降雨量: 12.4,
  },
  {
    name: 'Berlin',
    月份: 'Feb.',
    月均降雨量: 23.2,
  },
  {
    name: 'Berlin',
    月份: 'Mar.',
    月均降雨量: 34.5,
  },
  {
    name: 'Berlin',
    月份: 'Apr.',
    月均降雨量: 99.7,
  },
  {
    name: 'Berlin',
    月份: 'May',
    月均降雨量: 52.6,
  },
  {
    name: 'Berlin',
    月份: 'Jun.',
    月均降雨量: 35.5,
  },
  {
    name: 'Berlin',
    月份: 'Jul.',
    月均降雨量: 37.4,
  },
  {
    name: 'Berlin',
    月份: 'Aug.',
    月均降雨量: 42.4,
  },
];

class ChartsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
    };
  }
  handleUpdate = () => {
    this.setState({ data: updateData });
  };
  render() {
    const selftOption = {
      title: {
        visible: true,
        text: '基础柱状图',
      },
      tooltip: {
        custom: {
          customContent: (title, items) => {
            console.log(items);
            return (
              <div style={{ padding: '16px 8px' }}>
                <h5>提示</h5>
                <p>年份：{title}</p>
                <p style={{ margin: 0 }}>
                  值：{items[0] && items[0].data.sales}
                </p>
              </div>
            );
          },
        },
      },
    };
    const grounpOption = {
      groupField: 'name',
    };
    const config = {
      data: this.state.data,
      xField: 'type',
      yField: 'sales',
      chartsType: 'column',
      customerOption: selftOption,
    };
    const rangeConfig = {
      data: rangeData,
      xField: 'type',
      yField: 'values',
      chartsType: 'RangeColumn',
    };
    const grounpConfig = {
      data: grounpData,
      xField: '月份',
      yField: '月均降雨量',
      chartsType: 'GroupedColumn',
      customerOption: grounpOption,
    };
    return (
      <div>
        <Button type="primary" onClick={this.handleUpdate}>
          数据更新
        </Button>
        <SelfColumn {...config} id="column" />
        <SelfColumn {...rangeConfig} id="rangeColumn" />
        <SelfColumn {...grounpConfig} id="grounpColumn" />
      </div>
    );
  }
}

export default ChartsDemo;
