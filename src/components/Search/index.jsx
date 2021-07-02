import React, { Component, useState, useEffect } from 'react';
import { Form, Row, Col, Button, Space } from 'antd';
import Icon from '@ant-design/icons';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { searchItem, formatData } from './config';
import { useDebounceFn } from 'ahooks';
import { toInteger, forIn } from 'lodash';
import { isEmptyObj, isObject } from 'utils';
import './index.less';

class SearchItem extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return <Component {...rest} />;
  }
}

let searchValues = {};

function AdvancedSearchForm(props) {
  let rowCount = 1;
  const { SelectQueryParams } = props;
  const [form] = Form.useForm();
  const [type, setType] = useState(props.type); // 搜索类型
  const [expand, setExpand] = useState(!!props.expand || false); // 默认收起
  const [loading, setLoading] = useState(props.loading || false); // 节流阀
  const [list, setList] = useState(searchItem[props.type] || []); // 查询子项
  const [colNum, setColNum] = useState(props.colNum || 3);
  const [span, setSpan] = useState(props.span || 8);
  const [isSubmitChangeLine, setIsSubmitChangeLine] = useState(
    props.isSubmitChangeLine || false,
  ); //操作按钮是否需要换行

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  // 查询
  const { run } = useDebounceFn(
    value => {
      const { onSearch } = props;
      onSearch && onSearch(formatData(value));
    },
    {
      wait: 500,
    },
  );

  // 重置
  const { run: handleReset } = useDebounceFn(
    () => {
      const { onReset } = props;
      form.resetFields();
      let value = formatData(form.getFieldsValue());
      onReset && onReset(value);
    },
    {
      wait: 500,
    },
  );

  // 展开收起
  const toggle = () => {
    setExpand(!expand);
  };

  // 处理自定义校验
  const handleValidate = (targetKey, validateList) => {
    let child = {};
    if (isEmptyObj(validateList)) {
      return {};
    }
    forIn(validateList, (value, key) => {
      if (targetKey === key) {
        child[key] = validateList[key];
      }
    });
    return child;
  };

  // 处理表单子项
  const getFields = () => {
    const { config = {}, commonParams, validateList = {}, ...rest } = props;
    const colSpan = toInteger(24 / colNum);
    const labelCol = 6 - (3 - colNum) * 2;
    const wrapperCol = 24 - labelCol;
    const layout = {
      labelCol: { span: labelCol },
      wrapperCol: { span: wrapperCol },
    };
    const count = expand ? list.length : 3;
    let children = [];
    let countNum = 0;
    list.forEach((item, index) => {
      let newProps = {
        API: item.API,
        list: item.list,
        search: item.search,
        commonParams,
        handleSearch: run,
        handleReset,
        searchValues,
        SelectQueryParams,
      };
      const validateFn = handleValidate(item.key, validateList)[item.key] || {};
      // 记录搜索页面的占比总和，从而计算出搜索行数
      countNum += item.span || span;
      if (config && !isEmptyObj(config)) {
        for (let key in config) {
          for (let cKey in config[item.key]) {
            if (isObject(config[item.key][cKey])) {
              let conf = Object.assign({}, config[item.key][cKey]);
              newProps[cKey] = { ...newProps[cKey], ...conf };
            } else {
              newProps = { ...newProps, ...conf[item.key] };
            }
          }
        }
      }
      children.push(
        <Col
          span={item.span || colSpan}
          key={item.key}
          style={{ display: index < count ? 'block' : 'none' }}
          className="search_item"
        >
          <Form.Item
            labelCol={{ span: 3 }}
            label={item.label}
            colon={false}
            name={item.key}
            {...(item.decoratorOption || validateFn)}
          >
            <SearchItem component={item.content} {...newProps} {...rest} />
          </Form.Item>
        </Col>,
      );
    });
    rowCount = Math.ceil(countNum / 24);
    return children;
  };

  const offsetCol = () => {
    let offset;
    let num = list.length % 3;
    if (expand) {
      if (list.length >= 3) {
        if (num == 1) {
          offset = 8;
        } else if (num == 2) {
          offset = 0;
        } else {
          offset = 16;
        }
      }
    }
    return offset;
  };

  const getForm = () => {
    const colSpan = toInteger(24 / colNum);
    let children = getFields();
    const len = children.length;
    children.push(
      <Col
        className="re-btn"
        span={len >= 4 ? 24 : colSpan}
        style={{ textAlign: 'right' }}
      >
        <Space style={{ marginBottom: 10 }}>
          <Button type="default" onClick={handleReset}>
            重置
          </Button>
          <Button type="primary" loading={loading} htmlType="submit">
            查询
          </Button>
          {rowCount >= 1 && list.length > 3 && (
            <a onClick={toggle} className="f_cp">
              {expand ? <>收起</> : <>展开</>}
            </a>
          )}
        </Space>
      </Col>,
    );
    return children;
  };

  return (
    <Form
      labelAlign="left"
      className="m-search"
      from={form}
      onFinish={run}
      onValuesChange={(changeValues, allValues) => {
        searchValues = allValues;
      }}
    >
      <Row gutter={24}>{getForm()}</Row>
    </Form>
  );
}

export default AdvancedSearchForm;
