# eg-imageview

单张图片预览组件，依赖于eagle-ui组件库。

## UI展示

![ui展示](example/img/test.gif)

## 使用

```js

	import {ImageView} from '../../src/index.js';
    import React, { Component ,PropTypes} from 'react';
    import ReactDom from 'react/lib/ReactDOM';
    import {Button,Dialog,Toast,Icon} from 'eagle-ui';
    
    let file = {
        name:'test',
        url:'./src/test.jpg'
    };
    
    function show(){
        Dialog.mask('testIamgeView');
    }
    
    ReactDom.render(
        <div>
            <Button onClick={show}>点击我显示图片预览</Button>
            <ImageView id="testIamgeView" file={file} style={{width:'1200px'}} />
        </div>,
        document.getElementById('root')
    );

```

## 示例演示

下载此项目到本地安装依赖包后执行 **npm run demo** 即可预览。


