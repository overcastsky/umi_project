import React, { useState, useEffect } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/zh_CN';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

function RangePickerItem(props) {
  const [value, setValue] = useState(props.value);

  const onChange = (date, dateStr) => {
    const { onChange } = props;
    onChange && onChange(date, dateStr);
    if (!date || !dateStr) {
      setValue([undefined, undefined]);
      return;
    }
    setValue([moment(dateStr[0], dateFormat), moment(dateStr[1], dateFormat)]);
  };

  return (
    <ConfigProvider locale={locale}>
      <RangePicker
        style={{ width: '100%' }}
        onChange={onChange}
        value={value}
        allowClear={true}
        {...props.API}
      />
    </ConfigProvider>
  );
}

export default RangePickerItem;
