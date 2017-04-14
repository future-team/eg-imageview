# eg-imageview

单张或多张图片预览组件，依赖于eagle-ui组件库。   
1、支持两种方式的参数传递。一是通过file参数，二是以item的数组方式传入。   
2、支持放大、缩小、旋转等功能。    
3、可以指定是否循环展示   
4、指定是否显示遮罩

## 提示：eagle-ui是3.0.0以下版本请拉取3.0.5版本，以上版本拉取3.0.1。

## UI展示

![ui展示](example/img/test.gif)    

## 参数介绍   

```js
/**
 * @param file
 * 图片参数数组
 * @default []
 * */
file: {
    name: '',
    url: ''
},
id: '',
/**
 * @param isMask
 * 是显示遮罩层
 * @default true
 * */
isMask: true,
/**
 * @param isLoop
 * 是否循环播放
 * @default true
 * */
isLoop: true,
/**
 * @param activeIndex
 * 当前展示图片下标
 * @default 0
 * */
activeIndex:0
/**
 * @param showIcon
 * 配置要显示的操作图标
 * @default Object
 * */
showIcon:{
    /**
     * @param leftRotate
     * 是否显示左旋转图标
     * @default false
     * */
    leftRotate:false,
    /**
     * @param rightRotate
     * 是否显示右旋转图标
     * @default false
     * */
    rightRotate:false,
    /**
     * @param zoomIn
     * 是否显示放大图标
     * @default false
     * */
    zoomIn:false,
    /**
     * @param zoomOut
     * 是否显示放大图标
     * @default false
     * */
    zoomOut:false
}                                
            
```   

ps： file参数需按上述结构。单张图片支持对象，多张必须为数组。

## 使用

*   一、原有通过file参数的方式传入，单个图片支持数组或者对象，多张图片只支持数组。
    activeIndex，默认显示的图片下标。
```js

	import {ImageView} from '../../src/index.js';
    import React, { Component ,PropTypes} from 'react';
    import ReactDom from 'react/lib/ReactDOM';
    import {Button,Dialog,Toast,Icon} from 'eagle-ui';
    
    let file = {
        name:'test',
        url:'./src/test.jpg'
    },
    showIcon={
              leftRotate:true,
               rightRotate:true,
               zoomIn:true,
               zoomOut:true
               };
    function show(){
        Dialog.mask('testIamgeView').then(function(){
            console.log('success');
            Dialog.close();
        },function(type){
            console.log('cancel');
        });
    }
    
    ReactDom.render(
        <div>
            <Button onClick={show}>点击我显示图片预览</Button>
            <ImageView id="testIamgeView" file={file} activeIndex={0} showIcon={showIcon}/>
        </div>,
        document.getElementById('root')
    );

```   

*   二、以子对象的方式传入   


```js
<ImageView id="testIamgeView1" activeIndex={0}>
    <item url='./src/3.jpg' name='demo1'></item>
    <item url='./src/2.jpg' name='demo2'></item>
    <item url='./src/1.jpg' name='demo3'></item>
</ImageView>
```

## 示例演示

下载此项目到本地安装依赖包后执行 **npm run demo** 即可预览。

## update 

* `version 3.0.5` 支持eagle-ui3.0以下的版本。
* `version 3.0.1` 支持eagle-ui3.0以上版本。
* `version 3.0.0` 增加向左向右旋转功能，支持各个选项配置，不再默认全部展示。


* `version 2.0.9` 支持多图片上下翻页和是否展示遮罩层
* `version 2.0.1` 支持图片放大后拖动，修复图片旋转后位置错误bug，修复图片拉伸变形
* `version 2.0.2` 支持多张图片的展示和翻页 


