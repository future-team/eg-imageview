import {ImageView} from '../../src/index.js';
import React, { Component ,PropTypes} from 'react';
import ReactDom from 'react/lib/ReactDOM';
import {Button,Dialog,Toast,Icon} from 'eagle-ui';

class Demo extends  Component {
    constructor(props){
        super(props)
        this.state = {
            file: {
                name: 'demo',
                url: `./src/1.jpg`
            }
        }
    }
    show() {
        const index = parseInt(Math.random() * 3) % 10 || 1;
        this.setState({
            file: {
                name: 'demo',
                url: `./src/${index}.jpg`
            }
        })
        Dialog.mask('testIamgeView');
    }
    render(){
        return (
            <div>
                <Button onClick={::this.show}>点击我显示图片预览</Button>
                <ImageView id="testIamgeView" file={this.state.file}/>
            </div>
        )
    }
}
ReactDom.render(
        <Demo></Demo>
    ,
    document.getElementById('root')
);