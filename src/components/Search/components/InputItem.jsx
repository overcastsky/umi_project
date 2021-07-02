import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

function InputItem(props) {
  const { API } = props;
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, []);

  const onChange = e => {
    const { onChange } = props;
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <Input
      {...API}
      style={{ width: '100%' }}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputItem;
