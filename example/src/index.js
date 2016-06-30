import {ImageView} from '../../src/index.js';
import React, { Component ,PropTypes} from 'react';
import ReactDom from 'react/lib/ReactDOM';
import {Button,Dialog,Toast,Icon} from 'eagle-ui';

let file = {
    name:'test',
    url:'./src/test2.jpg'
};

function show(){
    Dialog.mask('testIamgeView');
}

ReactDom.render(
    <div>
        <Button onClick={show}>点击我显示图片预览</Button>
        <ImageView id="testIamgeView" file={file}  />
    </div>,
    document.getElementById('root')
);