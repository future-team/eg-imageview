import {ImageView} from '../../src/index.js';
import React, { Component ,PropTypes} from 'react';
import ReactDom from 'react/lib/ReactDOM';
import {Button,Dialog,Toast,Icon} from 'eagle-ui';

class Demo extends  Component {
    constructor(props){
        super(props)
        this.state = {
            file: [],
            activeIndex:0
        }
    }

    show() {
        var a;
        const index = parseInt(Math.random() * 20) % 10 || 1;
        this.setState({
            file: [{
                name: 'demo',
                url: `./src/1.jpg`
            },{
                name: 'demo2',
                url: `./src/2.jpg`
            }
            ],
            activeIndex:a
        })
        setTimeout(()=>{
            this.setState({
                file: [{
                    name: 'demo',
                    url: `./src/1.jpg`
                },{
                    name: 'demo2',
                    url: `./src/2.jpg`
                }
                ],
                activeIndex:1
            })
        },200)
        Dialog.mask('testIamgeView');
        //Dialog.mask('testIamgeView1');
      /*  <ImageView id="testIamgeView1" activeIndex={0} isMask={false}>
            <item url='./src/3.jpg' name='demo1'></item>
            <item url='./src/2.jpg' name='demo2'></item>
            <item url='./src/1.jpg' name='demo3'></item>
        </ImageView>*/
    }
    render(){
        return (
            <div>
                <Button onClick={::this.show}>点击我显示图片预览</Button>
                <ImageView id="testIamgeView" file={this.state.file} activeIndex={this.state.activeIndex} isMask={false}/>

            </div>
        )
    }
}
ReactDom.render(
        <Demo></Demo>
    ,
    document.getElementById('root')
);