const accept = "*.3gpp:audio/3gpp,video/3gpp|*.ac3:audio/ac3|*.asf:allpication/vnd.ms-asf|*.au:audio/basic|*.css:text/css|*.csv:text/csv|*.doc:application/msword|*.dtd:application/xml-dtd|*.dwg:image/vnd.dwg|*.dxf:image/vnd.dxf|*.gif:image/gif|*.jp2:image/jp2|*.jpg:image/jpeg|*.js:text/javascript,application/javascript|*.json:application/json|*.mp2:audio/mpeg,video/mpeg|*.mp3:audio/mpeg|*.mp4:audio/mp4,video/mp4|*.mpeg:video/mpeg|*.mpp:application/vnd.ms-project|*.ogg:application/ogg,audio/ogg|*.pdf:application/pdf|*.png:image/png|*.ppt:application/vnd.ms-powerpoint|*.rtf:application/rtf,text/rtf|*.svf:image/vnd.svf|*.tiff:image/tiff|*.txt:text/plain|*.wps:application/vnd.ms-works|*.xhtml:application/xhtml+xml|*.xlt:application/vnd.ms-excel|*.xml:text/xml,:application/xml|*.zip:aplication/zip|*.xlsx:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export default ({ type }) => {
  return {
    visible: type === 'upload',
    label: '其它属性',
    type: 'group',
    children: [
      {
        type: 'switch',
        key: 'multiple',
        checkedChildren: '多选文件',
        unCheckedChildren: '单选文件',
        config: {
          initialValue: false,
          valuePropName: 'checked'
        },
        formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
      },
      {
        type: 'switch',
        key: 'directory',
        checkedChildren: '支持目录上传',
        unCheckedChildren: '不支持目录上传',
        config: {
          initialValue: false,
          valuePropName: 'checked'
        },
        formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
      },
      {
        type: 'switch',
        key: 'withCredentials',
        checkedChildren: '携带 Cookie',
        unCheckedChildren: '不携带 Cookie',
        config: {
          initialValue: false,
          valuePropName: 'checked'
        },
        formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
      },
      {
        label: '1. 内建样式',
        formItemLayout: {
          colon: false,
        },
        type: 'radio',
        key: 'listType',
        options: [
          { label: 'text', value: 'text' },
          { label: 'picture', value: 'picture' },
          { label: 'picture-card', value: 'picture-card' },
        ],
        config: {
          initialValue: 'text'
        }
      },
      {
        label: '2. 接口文件类型',
        formItemLayout: {
          colon: false,
        },
        type: 'select',
        key: 'accept',
        mode: 'multiple',
        options: [
          { label: '', value: '' },
          // 有重复的 value 值
          ...(accept.split('|').map(item => {
            let r = item.split(':');
            return {
              label: r[0],
              value: r[1]
            }
          }))
        ]
      }
    ]
  }
}