import {ImageView} from '../../src/index.js';
import React, { Component ,PropTypes} from 'react';
import ReactDom from 'react/lib/ReactDOM';
import {Button,Dialog,Toast,Icon} from 'eagle-ui';
import { Redirect, Router, Route } from 'react-router';
import History from 'history/lib/createHashHistory';
import {Head,Footer} from 'gfs-head'

class Demo1 extends  Component {
    constructor(props){
        super(props)
        this.state = {
            file: [],
            activeIndex:0
        }
    }
    show() {
        setTimeout(()=>{
            this.setState({
                file: [{
                    name: 'demoeeeeeeee',
                    url: `./src/1.jpg`
                },{
                    name: 'demo2',
                    url: `./src/2.jpg`
                },{
                    name: 'demo7',
                    url: `./src/7.jpg`
                },{
                    name: 'demo9',
                    url: `./src/8.jpg`
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
            Dialog.mask('testImageView1');
        },200)
        Dialog.mask('testImageView1');
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
                <ImageView id="testImageView1" file={this.state.file} showIcon={this.state.showIcon} activeIndex={this.state.activeIndex} isMask={true}/>
            </div>
        )
    }
}

class Demo2 extends  Component {
    constructor(props){
        super(props)
        this.state = {
            file: [{
                name: 'demo3',
                url: `./src/3.jpg`
            },{
                name: 'demo5',
                url: `./src/5.jpg`
            },{
                name: 'demo6',
                url: `./src/6.jpg`
            },{
                name: 'demo9',
                url: `./src/9.jpg`
            }],
            showIcon:{
                leftRotate:true,
                rightRotate:true,
                zoomIn:true,
                zoomOut:true
            },
            activeIndex:0
        }
    }
    show(id) {
        Dialog.mask(id);
    }
    render(){
        return (
            <div>
                <h1>demo2</h1>
                <h2>这是一个imageView的实例-1</h2>
                <Button onClick={this.show.bind(this,'testImageView2')}>点击我显示图片预览demo2</Button>
                <ImageView id="testImageView2" file={this.state.file} showIcon={this.state.showIcon} activeIndex={this.state.activeIndex} isMask={true}/>
                <br/>
                <h2>这是一个imageView的实例-2</h2>
                <Button onClick={this.show.bind(this, 'testImageView3')}>点击我显示图片预览demo3</Button>
                <ImageView id="testImageView3" file={this.state.file} showIcon={this.state.showIcon} activeIndex={this.state.activeIndex} isMask={true}/>
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
                <Redirect from="/" to="/demo1" />
            </Router>
        );
    }
}
ReactDom.render(
    <App/>,
    document.getElementById('root')
);
ReactDom.render(
    <Head titles={[{title: '博客', href: 'http://uedfamily.com/'},
            {title: '关于我们', href: 'http://uedfamily.com/about/'},
            {title: '更多组件', href: 'http://uedfamily.com/framework/'}]}/>,
    document.getElementById('head')
);
ReactDom.render(
    <Footer/>,
    document.getElementById('footer')
);