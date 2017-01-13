/**
 * Created by mac on 16/5/9.
 */

import React,{PropTypes} from 'react';
import Component from 'eagle-ui/lib/utils/Component';
import {Dialog,Icon} from 'eagle-ui';
import classnames from 'classnames';
import ReactDom from 'react/lib/ReactDOM';
import Dom from 'eagle-ui/lib/utils/Dom'

import Draggable from './Draggable'
import uploadStyle from '../css/imageview.less';
import {isArray, toArray} from './utils'

export default class ImageView extends Component {

    static propTypes = {
        /**
         * 样式前缀
         * @property classPrefix
         * @type String
         * @default btn
         * */
        classPrefix: PropTypes.string,
        /**
         * 标签tagName
         * @property componentTag
         * @type String
         * @default a
         * */
        componentTag: PropTypes.string
    };

    static defaultProps = {
        componentTag: 'div',
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
        activeIndex: 0,
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
             * 是否显示左旋转图标
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
    };

    constructor(props, context) {
        super(props, context);
        this.imgId = this.uniqueId();
        this.totalNum = 1;
        this.transform = 'scale(1, 1) rotate(0deg)';
        this.state = {
            maxHeight: (document.documentElement.clientHeight * 1 - 100),
            maxWidth: (document.documentElement.clientWidth * 1 - 100),
            imgWrap: {
                height: 'auto',
                width: 'auto'
            },
            activeIndex: this.props.activeIndex || 0,
            name: '图片',
            sizeChange: false
        }
        this.initSize = {
            height: 'auto',
            width: 'auto'
        };
        this.isLoop = this.props.isLoop;
        this.showIcon = this.props.showIcon;
    }
    /**
     * 判断旋转方向
     * */
    getDirNum(rorateVal,dir){

        return dir == 1 ? (rorateVal >= 0?1:-1):(rorateVal <= 0 ? -1:1);
    }
    /**
     * @dir -1 向左 1 向右
     * */
    cssEnhance(type,dir) {
        const val = this.transform.match(/-?\d+\.?\d*/g);
        if (val && val.length >= 3) {
            let {zoom, rotate} = 0;
            switch (type) {
                case 'rotate':
                    //val[2] = val[2]>=270?0
                    zoom = 0;
                    rotate = 90;
                    break;
                case 'max':
                    zoom = 0.5;
                    rotate = 0;
                    break;
                case 'min':
                    zoom = -0.5;
                    rotate = 0;
                    break;
            }
            // this.transform = val;
            this.calculatePosition(zoom, rotate, type, dir);
        }
    }
    componentWillReceiveProps(nextProps) {
        this.transform = 'scale(1, 1) rotate(0deg)';
        let index = nextProps.activeIndex;
        this.setState({
            imgWrap: {
                height: 'auto',
                width: 'auto'
            },
            activeIndex: typeof(index) == 'undefined' ? this.state.activeIndex : index,
        });
        this.isLoop = nextProps.isLoop;
        this.showIcon = Object.assign(this.showIcon,nextProps.showIcon);
    }
    /**
     * 获取img size & reset
     * */
    onLoadHandler(e) {
        // 获取加载图片的大小
        this.imgSize = this.getImgSize(this.state.activeIndex);
        let size = this.imgSize;
        this.setState({
            imgWrap: size
        })
        //reset
        this.transform = 'scale(1, 1) rotate(0deg)';
    }

    getDeg(deg,dir) {
        switch (deg / 180 % 2 *dir) {
            case 0:
            case 1:
                deg = 0;
                break;
            case 0.5:
                deg = 1;
                break;
            case 1.5:
                deg = -1;
                break;
            default:
                deg = 0;
        }
        return deg;
    }

    /**
     *
     * @param zoom 放大/缩小
     * @param rotate 旋转
     * @param type 操作类型
     * @param dir 旋转方向
     */
    calculatePosition(zoom, rotate, type,dir) {
        let vals = this.transform.match(/-?\d+\.?\d*/g);
        const scaleVal = vals[0] * 1 + zoom;
        const rotateVal = vals[2] * 1+ rotate*dir;
        let diff = vals[3] || vals[4] || 0;
        let imgSize = this.imgSize;
        if (type == 'rotate') {
            let dirNum = this.getDirNum(rotateVal,dir);
            const tx = this.getDeg(rotateVal,dirNum);
            if (tx == 0) {
                // 重置为正常
                diff = 0;
                // 正常的显示
                this.setState({
                    imgWrap: {
                        width: imgSize.width,
                        height: imgSize.height
                    }
                })
            } else {
                // 图片的宽高比
                const imgScaleHW = imgSize.width / imgSize.height;
                let iH = this.state.imgWrap.height;
                let iW = this.state.imgWrap.width;
                const mW = this.state.maxWidth;
                const mH = this.state.maxHeight;
                let dirNum = this.getDirNum(rotateVal,dir);
                // wrap 的宽高转换
                if (iH > mW) {
                    // 计算 iw 的值
                    iH = mW
                    iW = imgScaleHW * iH
                } else if (iW > mH) {
                    // 计算ih 的值 mW
                    iH = iW / imgScaleHW
                    iW = mH
                }
                // 计算偏移
                diff = dirNum*tx * (iW - iH) / 2;
                this.setState({
                    imgWrap: {
                        width: iH,
                        height: iW
                    }
                })
            }
        } else {
            // 重置拖放的位置
            this.draggable.reset();

        }
        let diffVal = diff * 1;
        // 如果为负数的话,图片就旋转了
        if (scaleVal <= 0) {
            return;
        }
        // 计算是否缩放
        // TODO 需要优化
        let _zoom = zoom || scaleVal - 1;
        if (_zoom != 0) {
            _zoom = _zoom > 0 ? 0.5 : 2
            diffVal = _zoom * diffVal;
        }
        this.transform = `scale(${scaleVal}, ${scaleVal}) rotate(${rotateVal}deg) translate(${diffVal}px, ${diffVal}px)`;
        // 渲染生效
        setTimeout((function () {
            const domStyle = ReactDom.findDOMNode(this.refs[this.imgId]).style;
            domStyle.WebkitTransform = this.transform;
            domStyle.msTransform = this.transform;
            domStyle.OTransform = this.transform;
            domStyle.transform = this.transform;
        }).bind(this));
        this.setState({
            sizeChange: true
        })
        Dialog.mask(this.props.id);
    }

    render() {
        this.isFile = !!this.props.children ? false : true;
        let {file} = this.props;
        let files = !this.isFile ? this.transToFile() : file;
        this.saveToLocal(files);
        this.name = this.getImgName(this.state.activeIndex);
        this.totalNum = this.getFileLength();
        let {leftRotate,rightRotate,zoomIn,zoomOut} = this.showIcon;
        return (
            <Dialog id={this.props.id} isClose={true} isMask={this.props.isMask} title={this.name} {...this.props} >
                <div className='img-hover'>
                    <div className={"img-wrap "+ (this.props.overflow? 'img-wrap-hidden':'img-wrap-show')}
                         style={{
                            height: this.state.imgWrap.height,
                            width: this.state.imgWrap.width
                            }}>
                        <Draggable ref={(draggable)=>{
                            this.draggable = draggable;
                        }}>
                            {this.renderContent()}
                        </Draggable>
                    </div>
                    <div className={
                        classnames(
                            'icon-side left-15',
                            this.isShowSideArrow()
                        )
                    }>
                        <Icon onClick={::this.countIndex.bind(this,'left')} className='upload-icon'
                              name='chevron_left'></Icon>
                    </div>
                    <div className={
                        classnames(
                            'icon-side right-15',
                            this.isShowSideArrow()
                        )
                    }>
                        <Icon onClick={::this.countIndex.bind(this,'right')} className="upload-icon"
                              name='chevron_right'></Icon>
                    </div>
                    <div className="icon-box">
                        {this.renderArrow(leftRotate,'left')}
                        {this.renderArrow(rightRotate,'right')}
                        <Icon onClick={::this.cssEnhance.bind(this,'max',1)}
                              className={classnames(
                                            'upload-icon',
                                            this.isHideIcon(zoomIn)
                                            )}
                              name="add"
                              alt="放大"></Icon>
                        <Icon onClick={::this.cssEnhance.bind(this,'min',1)}
                              className={classnames(
                                            'upload-icon',
                                            this.isHideIcon(zoomOut)
                                            )}
                              name="remove"
                              alt="缩小"></Icon>

                        <div className='tip-num'>
                            <label className='red-txt'>{this.state.activeIndex + 1}</label>
                            <label className='mar-5'>/</label>
                            <label className='white-txt'>{this.totalNum}</label>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
    /**
     * is show side arrow
     * */
    isShowSideArrow(){
        let len = this.getFileLength();
        return len > 1 ? '' : 'hide';
    }
    /**
     * is show icon
     * */
    isHideIcon(key){
        return key?'':'hide';
    }
    /**
     * 放大或者拖动时不需要overHidden
     * */
    isOverHide() {
        return this.state.sizeChange ? '' : 'over-hidden';
    }

    /**
     * 渲染多图情况
     * */
    renderContent() {
        //let {file} = this.props;
        //let files = !this.isFile ? this.transToFile() : file;
        //this.saveToLocal(files);
        return (
            <div>
                {this.renderImage(this.state.activeIndex)}
            </div>
        )
    }

    renderImage(index) {
        return <div className={
                        this.isOverHide()
                }><img draggable="false" id={this.imgId}
                       onLoad={this.onLoadHandler.bind(this)}
                       ref={this.imgId}
                       src={this.getImgSrc(index)} alt=""
                       style={{
                                    maxHeight: this.state.maxHeight+'px',
                                    maxWidth: this.state.maxWidth+'px',
                                    msTransform: this.transform,
                                    WebkitTransform: this.transform,
                                    MozTransform: this.transform,
                                    OTransform: this.transform,
                                    transform: this.transform}}/>
        </div>
    }

    /**
     * transform children to files
     * */
    transToFile() {
        let file = [];
        React.Children.forEach(this.props.children, (options)=> {
            file.push({
                name: options.props.name,
                url: options.props.url
            });
        });
        return file;
    }

    /**
     * get file info push to local
     * */
    saveToLocal(file) {
        this._file = isArray(file)?file: toArray(file);
    }

    getFileLength() {
        return this._file ? this._file.length : 0;
    }

    getImgOpt(index) {
        let i = this.isValidLength(index, 0, this.getFileLength()-1) ? index : 0;
        return this._file ? this._file[i] : undefined;
    }

    isValidLength(index, min, max) {
        return index >= min ? (index <= max ? true : false) : false;
    }

    getImgName(index) {
        let opt = this.getImgOpt(index);
        return opt ? opt.name : '图片';
    }

    getImgSrc(index) {
        let opt = this.getImgOpt(index);
        return opt ? opt.url : '';
    }

    getImgSize(index) {
        let opt = this.getImgOpt(index),
            size = this.initSize,
            tempImg = new Image();
        if (!opt) return size;
        tempImg.src = opt.url;
        size = this.getModifySize(tempImg.width,tempImg.height,this.state.maxWidth,this.state.maxHeight);
       /* size = {
            width: tempImg.width,
            height: tempImg.height
        };*/
        return size;
    }

    isOver(init, max) {
        return init > max;
    }

    /**
     * 是否超出最大宽高
     *  */
    getModifySize(initW, initH, maxW, maxH) {
        let w = this.isOver(initW, maxW),
            h = this.isOver(initH, maxH),
            size = {
                width: initW,
                height: initH
            },
            i = initW / initH;
        (h || w) && (size = {
            width: i * maxH,
            height: maxH
        });
        return size;
    }


    countIndex(dir) {
        let index = parseInt(this.state.activeIndex),
            max = this.totalNum - 1,
            num = index;
        if (dir == 'left') {
            index > 0 && ( num = index - 1 );
            this.isLoop && index == 0 && (num = max);
        } else {
            index < max && ( num = index * 1 + 1 );
            this.isLoop && index == max && (num = 0);
        }
        if (num != index) {
            this.name = this.getImgName(this.props, this.isFile, num);
            this.imgId = this.uniqueId();
            this.setState({
                activeIndex: num,
                sizeChange: false
            });
        }
        Dialog.mask(this.props.id);
    }
    /**
     * 渲染旋转箭头方向
     * */
    renderArrow(key,dir){
        let dirs={
            left:-1,
            right:1
        }
        return <div onClick={::this.cssEnhance.bind(this,'rotate',dirs[dir])}
                    className={classnames(
                                            'arrow-warp',
                                            `arrow-${dir}`,
                                             this.isHideIcon(key)
                                            )}>
                    <div className='arrow'></div>
                    <div className='inner'></div>
                </div>

    }
}