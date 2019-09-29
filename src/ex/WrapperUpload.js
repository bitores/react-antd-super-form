import React, { Component, Fragment } from 'react';
import { Upload, Modal } from 'antd';

const { Dragger } = Upload;
// antd-img-crop 剪切
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // 预览
      previewVisible: false,
      previewImage: '',
      // 正常数据
      fileList: props.value || [],
      showButton: true
    }

    this.imageCount = 0;
    //--

    this.filters = [];
    if (props.fileType) {
      this.filters.push({
        name: 'type',
        fn: fileList => {
          console.log(fileList[0])
          let filterFiles = fileList.filter(f => props.fileType.indexOf(f.type) > -1);

          if (filterFiles.length !== fileList.length) {
            console.error('错误, 格式不支持')
            return filterFiles;
          }

          return fileList;
        }
      })
    }

    if (props.size) {
      this.filters.push({
        name: 'size',
        fn: fileList => {
          let filterFiles = fileList.filter(f => f.size <= props.size);

          if (filterFiles.length !== fileList.length) {
            console.error('错误, 太大')
            return filterFiles;
          }

          return fileList;
        }
      })
    }

    this.filters.push(...(props.filter || []))
  }

  // limit: 限制单次最多上传数量，nzMultiple 打开时有效；0 表示不限
  // size: 限制文件大小，单位：KB；0 表示不限
  // fileType: 限制文件类型，例如：image/png,image/jpeg,image/gif,image/bmp
  // filter: 自定义过滤器
  // showButton 是否展示上传按钮

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  render() {
    const { filters } = this;
    const {
      previewVisible,
      previewImage,
      //
      fileList,
      showButton = true,
    } = this.state;
    const {
      children,
      max = 0,
      filter,
      onChange,
      beforeUpload,
      onRemove,
      // crop
      modalTitle, modalWidth, resize, resizeAndDrag,
      ...uploadProp
    } = this.props;

    return <Fragment>
      <Upload
        fileList={fileList}
        onChange={({ fileList }) => {
          let needShowButton = true;
          if (max == 0 || fileList.length < max) {
            needShowButton = true;
          } else {
            needShowButton = false;
          }
          fileList.splice(max);
          onChange && onChange(fileList)
          this.setState({
            fileList: fileList,
            showButton: needShowButton
          })
        }}
        beforeUpload={(file, fileList) => {

          console.log(this.state.fileList.length, this.imageCount)
          // if (this.state.fileList.length + this.imageCount > max) {
          //   console.error('文件数量超出限定')
          //   return false;
          // } else {
          this.imageCount++;
          // }
          for (let i = 0; i < filters.length; i++) {
            let f = filters[i];
            let r = f.fn([file])
            if (r instanceof Promise) {
              return r
            };
            if (r.length !== 1) {
              return Promise.reject();
            }
          }

          return true;
        }}
        onRemove={(file) => {
          this.imageCount--;
          onChange && onChange(this.state.fileList)
          return true;
        }}
        onPreview={this.handlePreview}
        {...uploadProp}
      >
        {showButton && children}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Fragment>
  }
}