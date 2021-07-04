import SelectItem from './components/SelectItem';
import InputItem from './components/InputItem';
import RangePickerItem from './components/RangePickerItem';
import { isEmptyArr } from 'utils';
import { has } from 'lodash';
import moment from 'moment';

let Intention = {
  label: '意图名称',
  key: 'intentName',
  API: {
    placeholder: '请输入意图名称',
    allowClear: true,
  },
  content: InputItem,
};

let lastModifiedDate = {
  label: '修改时间',
  key: 'lastModifiedDate',
  content: RangePickerItem,
};

let file = {
  label: '文件名',
  key: 'fileName',
  API: {
    placeholder: '请输入文件名',
    allowClear: true,
  },
  content: InputItem,
};

// 如果需要配合后端进行模糊匹配，那么就不要传入filterOption
let UploadBy = {
  label: '上传人',
  key: 'userName',
  API: {
    placeholder: '请选择',
    allowClear: true,
    showSearch: true,
    optionFilterProp: 'children',
    // filterOption: (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    fieldNames: { id: 'value', name: 'time' },
  },
  content: SelectItem,
};

export const formatData = data => {
  if (has(data, 'lastModifiedDate')) {
    if (!isEmptyArr(data.lastModifiedDate)) {
      data.startTime = moment(data.lastModifiedDate[0]).format('YYYY-MM-DD');
      data.endTime = moment(data.lastModifiedDate[1]).format('YYYY-MM-DD');
      delete data.lastModifiedDate;
    } else {
      data.startTime = '';
      data.endTime = '';
      delete data.lastModifiedDate;
    }
  }
  return data;
};

export const searchItem = {
  ModelSearch: [Intention, lastModifiedDate, file, UploadBy],
};
