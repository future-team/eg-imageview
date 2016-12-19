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
        activeIndex: 0
    };

    constructor(props, context) {
        super(props, context);
        //this.imageSliderId = this.uniqueId();
        this.imgId = this.uniqueId();
        //default total 1
        this.totalNum = 1;
        //imgs sizes
        this.imgSizes = [];
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
            dirClass: 'left0',
            sizeChange: false
        }
        this.initSize = {
            height: 'auto',
            width: 'auto'
        };
        this.isLoop = this.props.isLoop;
    }
    cssEnhance(type) {
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
            this.calculatePosition(zoom, rotate, type);
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
            activeIndex: typeof(index) == 'undefined' ? this.state.activeIndex : index
        })
        this.isLoop = nextProps.isLoop;
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

    getDeg(deg) {
        switch (deg / 180 % 2) {
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
     */
    calculatePosition(zoom, rotate, type) {
        let vals = this.transform.match(/-?\d+\.?\d*/g);
        const scaleVal = vals[0] * 1 + zoom;
        const rotateVal = vals[2] * 1 + rotate;
        let diff = vals[3] || vals[4] || 0;
        let imgSize = this.imgSize;
        if (type == 'rotate') {
            const tx = this.getDeg(rotateVal);
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
                diff = tx * (iW - iH) / 2;
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
        //Dialog.mask(this.props.id);
    }

    render() {
        this.isFile = !!this.props.children ? false : true;
        this.name = this.getImgName(this.state.activeIndex);
        this.totalNum = this.getFileLength();
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
                    <div className='icon-side left-15'>
                        <Icon onClick={::this.countIndex.bind(this,'left')} className='upload-icon'
                              name='chevron_left'></Icon>
                    </div>
                    <div className='icon-side right-15'>
                        <Icon onClick={::this.countIndex.bind(this,'right')} className='upload-icon'
                              name='chevron_right'></Icon>
                    </div>
                    <div className="icon-box">
                        <Icon onClick={::this.cssEnhance.bind(this,'rotate')} className="upload-icon"
                              name="radio_unchecked" alt="旋转"></Icon>
                        <Icon onClick={::this.cssEnhance.bind(this,'max')} className="upload-icon" name="add"
                              alt="放大"></Icon>
                        <Icon onClick={::this.cssEnhance.bind(this,'min')} className="upload-icon" name="remove"
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
     * 放大或者拖动时不需要overHidden
     * */
    isOverHide() {
        return this.state.sizeChange ? '' : 'over-hidden';
    }

    /**
     * 渲染多图情况
     * */
    renderContent() {
        let {file} = this.props;
        let files = !this.isFile ? this.transToFile() : file;
        this.saveToLocal(files);
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
                       className={this.state.dirClass}
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
        this._file = file;
    }

    getFileLength() {
        return this._file ? this._file.length : 0;
    }

    getImgOpt(index) {
        let i = this.isValidLength(index, 0, this.getFileLength()) ? index : 0;
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
        /*size = {
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

    /**
     * trim imgsize if over maxSize
     * */
    getTrimSize() {

    }

    /**
     * @param isLoop 是否循环
     * @param cur current index
     * @param dir next show direction
     * */
    getShowNum(cur, dir, isLoop) {

    }

    countIndex(dir) {
        let index = parseInt(this.state.activeIndex),
            max = this.totalNum - 1;
        let dirClass = 'moveLeft',
            num = index;
        if (dir == 'left') {
            index > 0 && ( num = index - 1 );
            this.isLoop && index == 0 && (num = max);
        } else {
            dirClass = 'moveRight';
            index < max && ( num = index * 1 + 1 );
            this.isLoop && index == max && (num = 0);
        }
        if (num != index) {
            this.name = this.getImgName(this.props, this.isFile, num);
            this.imgId = this.uniqueId();
            this.setState({
                activeIndex: num,
                dirClass: dirClass,
                sizeChange: false
            }, ()=> {
                setTimeout(()=> {
                    this.setState({
                        dirClass: 'left0'
                    })
                }, 10)
            });
        }

    }
}