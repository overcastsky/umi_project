/**
 * @param {critical} number 上传文件临界值
 * @param { url } String 上传文件地址
 * @param { additional } Object 上传文件额外的参数
 * @param { uploadOption(...rest) } Object 支持所有Upload组件的API
 * **/

import React from 'react';
import { Upload, Button, message } from 'antd';
import { services } from '../../api';
import { UploadOutlined } from '@ant-design/icons';

class CustomizeUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }
  onChange = info => {
    const {
      url = 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      additional = {},
      showNum = -1,
    } = this.props;
    services.post(
      url,
      { ...additional },
      data => {
        console.log(data);
        if (info.file.status === 'done') {
          let fileList = [...info.fileList];
          fileList = fileList.slice(showNum);
          fileList = fileList.map(file => {
            if (file.response) {
              // Component will show file.url as link
              file.url = file.response.url;
            }
            return file;
          });
          this.setState({ fileList });
          message.success(`文件上传成功`);
        }
      },
      error => {
        console.log(error);
      },
    );
  };
  beforeUpload = (file, filelist) => {
    const { critical } = this.props;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      const result = reader.result.split(',')[1];
      file['buffer'] = new Buffer(result);
    });
    // 判断上传文件大小
    if (file.size > critical) {
      file.status = 'error';
      message.warning('文件体积过大');
      return false;
    }
  };
  render() {
    const { ...rest } = this.props;
    const { fileList } = this.state;
    return (
      <Upload
        onChange={this.onChange}
        beforeUpload={this.beforeUpload}
        fileList={fileList}
        {...rest}
      >
        <Button>
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload>
    );
  }
}

export default CustomizeUpload;
