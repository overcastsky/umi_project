/**
 * api:
 * 1、maxCount: 最大显示个数，针对mode='multiple'.
 * 2、slurSearch: 模糊匹配URL.
 * 3、params: 查询时额外的参数.
 * 4、funcName: 下拉列表查询URL.
 * 5、fieldNames: 下拉框选项参数别名, { id: 'aId, name: 'aName' }.
 * 6、支持所有antd中的Select的API
 * **/

/**
 * 普通用法:组件内部请求
 * <Select funcName='http://xxxxx' params={{ code: '01' }} fieldNames={{ id: 'code', name: 'value' }} />
 * 组件外部请求
 * <Select>
 *   { majorTypeList && majorTypeList.map(item => <Select.Option value={item.id} key={item.id}>{ item.name }</Select.Option>) }
 * </Select>
 * 模糊匹配
 * <Select slurSearch='http://xxxxx' params={{ code: '01' }} />
 * **/

import React, { useState, useEffect } from 'react';
import { Select, Spin, message } from 'antd';
import { isEmptyData } from 'utils';
import { useMount } from 'ahooks';
import { services } from 'api';
import { debounce } from 'lodash';
import styles from './index.less';

const { Option } = Select;

function SelfSelect(props) {
  const { children, locale, fieldNames = {}, style = {}, ...reset } = props;
  let newProps = {};
  props.maxCount && (newProps.mode = 'multiple'); // 当多选的时候，默认Select模式为 ‘multiple’
  props.slurSearch && (newProps.showSearch = true); // 当存在模糊匹配的时候,为Select添加showSearch
  props.locale && (newProps.showSearch = true); // 当需要前端模糊匹配，为Select添加showSearch

  const [value, setValue] = useState(props.value);
  const [params, setParams] = useState(props.params);
  const [list, setList] = useState(props.list || []);
  const [commonParams, setCommonParams] = useState(props.commonParams || {});
  const [fetching, setFetching] = useState(false);

  // 下拉框请求
  const queryList = () => {
    const { funcName } = props;
    services.post(
      funcName,
      { ...params, ...commonParams },
      data => {
        setList(data);
      },
      error => {
        message.error(error.resultMesg);
      },
    );
  };

  // 模糊匹配
  const onSlurSearch = value => {
    const { slurSearch, slurCode } = props;
    if (!slurSearch) {
      return;
    }
    setFetching(true);
    services.post(
      slurSearch,
      {
        [slurCode]: value,
      },
      data => {
        setList(data);
        setFetching(false);
      },
      error => {
        setFetching(false);
        message.error(error.resultMesg);
      },
    );
  };

  // 文本框输入触发
  const onSearch = value => {
    if (!value) {
      return;
    }
    onSlurSearch(value);
  };

  const onChange = (value, option) => {
    const { maxCount, onChange, fieldNames = {}, onSelect } = props;
    // 校验长度
    if (maxCount && (value || []).length > maxCount - 0) {
      message.warning(`最多选择${maxCount}个`);
      value = value.slice(0, maxCount - 1);
    }
    let item = list.filter(item => item[fieldNames.id || 'id'] === value)[0]; // 当前选中项
    setValue(value);
    onChange && onChange(value, option, item);
    onSelect && onSelect(value, option, item);
  };

  // 下拉框初始化
  useMount(() => {
    const { funcName } = props;
    funcName && queryList();
  });

  return (
    <Select
      style={{ ...style, width: '100%' }}
      value={value}
      optionFilterProp={locale && 'children'}
      placeholder="请选择"
      showArrow={!props.slurCode}
      notFoundContent={fetching ? <Spin size="small" /> : '暂无数据'}
      filterOption={false}
      {...newProps}
      {...reset}
      onSearch={debounce(onSearch, 500)}
      onChange={onChange}
    >
      {children ||
        (!isEmptyData(list) &&
          list.map(item => (
            <Option
              key={item[fieldNames.id || 'id']}
              value={item[fieldNames.id || 'id']}
              title={item[fieldNames.name || 'name']}
            >
              {item[fieldNames.name || 'name']}
            </Option>
          )))}
    </Select>
  );
}

export default SelfSelect;
