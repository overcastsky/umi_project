import React from 'react';
import { Select } from 'antd';
import { isEmptyData } from 'utils';
import SelfSelect from '../../Select';

const { Option } = Select;

function SelectItem(props) {
  const { list, API = {}, search = {}, ...rest } = props;
  const { fieldNames = {} } = API;
  return (
    <SelfSelect {...API} {...search} {...rest}>
      {!isEmptyData(list) &&
        list.map(item => (
          <Option
            key={item[fieldNames.id || id]}
            value={item[fieldNames.id || 'id']}
          >
            {item[fieldNames.name || 'name']}
          </Option>
        ))}
    </SelfSelect>
  );
}

export default SelectItem;
