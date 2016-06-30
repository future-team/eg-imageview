/**
 * Created by mac on 16/5/9.
 */

import React,{PropTypes} from 'react';
import Component from 'eagle-ui/lib/utils/Component';
import {Dialog,Icon} from 'eagle-ui';
import classnames from 'classnames';
import ReactDom from 'react/lib/ReactDOM';

import uploadStyle from '../css/imageview.less';

export default class ImageView extends Component{

    static propTypes = {
        /**
         * 样式前缀
         * @property classPrefix
         * @type String
         * @default btn
         * */
        classPrefix:PropTypes.string,
        /**
         * 标签tagName
         * @property componentTag
         * @type String
         * @default a
         * */
        componentTag:PropTypes.string
    };

    static defaultProps = {
        componentTag:'div',
        file:{
            name:'',
            url:''
        },
        id:''
    };

    constructor(props,context){
        super(props,context);

        //this.imageSliderId = this.uniqueId();
        this.imgId = this.uniqueId();
        this.transform = 'scale(1, 1) rotate(0deg)';
    }

    /*static show(){
        this.transform = 'scale(1, 1) rotate(0deg)';

        Dialog.mask(this.imageSliderId);
    }*/

    cssEnhance(type){

        let val = this.transform.match(/\d+\.?\d*/g);

        let set=(zoom,rotate)=>{
            return `scale(${val[0]*1+zoom}, ${val[0]*1+zoom}) rotate(${val[2]*1+rotate}deg)`;
        };

        if(val && val.length>=3){
            switch (type){
                case 'rotate':
                    //val[2] = val[2]>=270?0
                    val =set(0,90);
                    break;
                case 'max':
                    val =set(0.5,0);
                    break;
                case 'min':
                    val =set(-0.5,0);
                    break;
            }

            this.transform = val;
            ReactDom.findDOMNode(this.refs[this.imgId]).style.transform = val;
        }
    }

    componentWillReceiveProps (nextProps) {
        this.transform = 'scale(1, 1) rotate(0deg)';
    }

    render() {

        let {file} = this.props;

        return (
            <Dialog id={this.props.id} isClose={true} isMask={true} title={file.name ||''}  {...this.props}>
                <div style={{
                        overflow:'hidden'
                    }}>
                    <img ref={this.imgId} src={file.url}  alt="" style={{width:"100%",maxHeight:(document.documentElement.clientHeight*1-100)+'px',transform:this.transform }} />
                    <div className="icon-box">
                        <Icon onClick={::this.cssEnhance.bind(this,'rotate')} className="upload-icon" name="radio_unchecked" alt="旋转"></Icon>
                        <Icon onClick={::this.cssEnhance.bind(this,'max')} className="upload-icon"  name="add" alt="放大"></Icon>
                        <Icon  onClick={::this.cssEnhance.bind(this,'min')} className="upload-icon" name="remove" alt="缩小"></Icon>
                    </div>
                </div>

            </Dialog>
        );
    }
}