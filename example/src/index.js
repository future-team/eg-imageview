import {ImageView} from '../../src/index.js';
import React, { Component ,PropTypes} from 'react';
import ReactDom from 'react/lib/ReactDOM';
import {Button,Dialog,Toast,Icon} from 'eagle-ui';
import { Redirect, Router, Route } from 'react-router';
import History from 'history/lib/createHashHistory';


class Demo1 extends  Component {
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
        setTimeout(()=>{
            this.setState({
                file: [{
                    name: 'demoeeeeeeee',
                    url: `./src/1.jpg`
                },{
                    name: 'demo2',
                    url: `./src/2.jpg`
                }
                ],
                activeIndex:0,
                showIcon:{
                    leftRotate:true,
                    rightRotate:true,
                    zoomIn:true,
                    zoomOut:true
                }
            })
            Dialog.mask('testIamgeView1');
        },200)
        Dialog.mask('testIamgeView1');
    }
    render(){
        return (
            <div>
                <h1>demo1</h1>
                <div className='arrow-warp'>
                <div className='arrow arrow-left'>
                </div>
                    <div className='inner'></div>
                </div>
                <Button onClick={::this.show}>点击我显示图片预览demo1</Button>
                <ImageView id="testIamgeView1" file={this.state.file} showIcon={this.state.showIcon} activeIndex={this.state.activeIndex} isMask={true}/>
            </div>
        )
    }
}

class Demo2 extends  Component {
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
        setTimeout(()=>{
            this.setState({
                file: [{
                    name: 'demo1111',
                    url: `./src/6.jpg`
                },{
                    name: 'demo2',
                    url: `./src/7.jpg`
                },{
                    name: 'demo3',
                    url: `./src/10.jpg`
                },{
                    name: 'demo4',
                    url: `./src/8.jpg`
                },{
                    name: 'demo5',
                    url: `./src/9.jpg`
                }
                ],
                activeIndex:0,
                showIcon:{
                    leftRotate:true,
                    rightRotate:true,
                    zoomIn:true,
                    zoomOut:true
                }
            })
            Dialog.mask('testIamgeView');
        },200)
        Dialog.mask('testIamgeView');
    }
    render(){
        return (
            <div>
                <h1>demo2</h1>
                <div className='arrow-warp'>
                    <div className='arrow arrow-left'>
                    </div>
                    <div className='inner'></div>
                </div>
                <Button onClick={::this.show}>点击我显示图片预览demo2</Button>
                <ImageView id="testIamgeView" file={this.state.file} showIcon={this.state.showIcon} activeIndex={this.state.activeIndex} isMask={true}/>
            </div>
        )
    }
}

class App extends Component {
    constructor(props,context) {
        super(props,context);
        // Opt-out of persistent state, not recommended.
        this.history = new History({
            queryKey: false
        });

    }
    static defaultProps={

    };
    render() {
        return (
            <Router history={this.history}>
                <Route path="/demo1" name="demo1" component={Demo1} />
                <Route path="/demo2" name="demo2" component={Demo2} />
                <Redirect from="/" to="/demo2" />
            </Router>
        );
    }
}
ReactDom.render(
    <App/>,
    document.getElementById('root')
);