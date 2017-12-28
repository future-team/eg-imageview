/**
 * Created by mac on 16/5/9.
 */

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _eagleUiLibUtilsComponent = require('eagle-ui/lib/utils/Component');

var _eagleUiLibUtilsComponent2 = _interopRequireDefault(_eagleUiLibUtilsComponent);

var _eagleUi = require('eagle-ui');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Draggable = require('./Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

require('../css/imageview.less');

var _utils = require('./utils');

var ImageView = (function (_Component) {
    _inherits(ImageView, _Component);

    _createClass(ImageView, null, [{
        key: 'propTypes',
        value: {
            /**
             * 样式前缀
             * @property classPrefix
             * @type String
             * @default btn
             * */
            classPrefix: _react.PropTypes.string,
            /**
             * 标签tagName
             * @property componentTag
             * @type String
             * @default a
             * */
            componentTag: _react.PropTypes.string
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
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
            showIcon: {
                /**
                 * @param leftRotate
                 * 是否显示左旋转图标
                 * @default false
                 * */
                leftRotate: false,
                /**
                 * @param rightRotate
                 * 是否显示左旋转图标
                 * @default false
                 * */
                rightRotate: false,
                /**
                 * @param zoomIn
                 * 是否显示放大图标
                 * @default false
                 * */
                zoomIn: false,
                /**
                 * @param zoomOut
                 * 是否显示放大图标
                 * @default false
                 * */
                zoomOut: false

            }
        },
        enumerable: true
    }]);

    function ImageView(props, context) {
        _classCallCheck(this, ImageView);

        _Component.call(this, props, context);
        this.imgId = this.uniqueId();
        this.totalNum = 1;
        this.transform = 'scale(1, 1) rotate(0deg)';
        this.state = {
            maxHeight: document.documentElement.clientHeight - 100,
            maxWidth: document.documentElement.clientWidth - 100,
            imgWrap: {
                height: 'auto',
                width: 'auto'
            },
            activeIndex: this.props.activeIndex || 0,
            name: '图片',
            //动画准备，暂时不用
            sizeChange: false
        };
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

    ImageView.prototype.getDirNum = function getDirNum(rorateVal, dir) {

        return dir == 1 ? rorateVal >= 0 ? 1 : -1 : rorateVal <= 0 ? -1 : 1;
    };

    /**
     * @dir -1 向左 1 向右
     * */

    ImageView.prototype.cssEnhance = function cssEnhance(type, dir) {
        var val = this.transform.match(/-?\d+\.?\d*/g);
        if (val && val.length >= 3) {
            var _ = 0;
            var zoom = _.zoom;
            var rotate = _.rotate;

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
            this.calculatePosition(zoom, rotate, type, dir);
        }
    };

    ImageView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var index = nextProps.activeIndex;
        this.setState({
            imgWrap: {
                height: 'auto',
                width: 'auto'
            },
            activeIndex: typeof index == 'undefined' ? this.state.activeIndex : index
        });
        this.isLoop = nextProps.isLoop;
        this.showIcon = Object.assign(this.showIcon, nextProps.showIcon);
        this.resetImageStatus();
    };

    ImageView.prototype.transformImg = function transformImg() {
        /**
         * @todo 原来操作dom，先不管等待改进
         * */
        setTimeout((function () {
            var dom = document.getElementById(this.imgId);
            if (dom != null) {
                var domStyle = dom.style; //ReactDom.findDOMNode(this.refs[this.imgId]).style;
                domStyle.WebkitTransform = this.transform;
                domStyle.msTransform = this.transform;
                domStyle.OTransform = this.transform;
                domStyle.transform = this.transform;
            }
        }).bind(this));
    };

    /**
     * 获取img size & reset
     * https://bugs.chromium.org/p/chromium/issues/detail?id=7731
     * */

    ImageView.prototype.onLoadHandler = function onLoadHandler(e) {
        // 获取加载图片的大小
        this.imgSize = this.getImgSize(this.state.activeIndex);
        var size = this.imgSize;
        this.setState({
            imgWrap: size
        });
        this.resetImageStatus();
    };

    ImageView.prototype.getDeg = function getDeg(deg, dir) {
        switch (deg / 180 % 2 * dir) {
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
    };

    /**
     *
     * @param zoom 放大/缩小
     * @param rotate 旋转
     * @param type 操作类型
     * @param dir 旋转方向
     */

    ImageView.prototype.calculatePosition = function calculatePosition(zoom, rotate, type, dir) {
        var vals = this.transform.match(/-?\d+\.?\d*/g);
        var scaleVal = vals[0] * 1 + zoom;
        var rotateVal = vals[2] * 1 + rotate * dir;
        var diff = vals[3] || vals[4] || 0;
        var imgSize = this.imgSize;
        if (!imgSize || !imgSize.width || !imgSize.height) {
            imgSize = this.imgSize = this.getImgSize(this.state.activeIndex);
        }
        if (type == 'rotate') {
            var dirNum = this.getDirNum(rotateVal, dir);
            var tx = this.getDeg(rotateVal, dirNum);
            if (tx == 0) {
                // 重置为正常
                diff = 0;
                // 正常的显示
                this.setState({
                    imgWrap: {
                        width: imgSize.width,
                        height: imgSize.height
                    }
                });
            } else {
                // 图片的宽高比
                var imgScaleHW = imgSize.width / imgSize.height;
                var iH = imgSize.height;
                var iW = imgSize.width;
                var mW = this.state.maxWidth;
                var mH = this.state.maxHeight;
                var _dirNum = this.getDirNum(rotateVal, dir);
                // wrap 的宽高转换
                if (iH > mW) {
                    // 计算 iw 的值
                    iH = mW;
                    iW = imgScaleHW * iH;
                } else if (iW > mH) {
                    // 计算ih 的值 mW
                    iH = iW / imgScaleHW;
                    iW = mH;
                }
                // 计算偏移
                diff = _dirNum * tx * (iW - iH) / 2;
                this.setState({
                    imgWrap: {
                        width: iH,
                        height: iW
                    }
                });
            }
        } else {
            // 重置拖放的位置
            this.draggable.reset();
        }
        var diffVal = diff * 1;
        // 如果为负数的话,图片就旋转了
        if (scaleVal <= 0) {
            return;
        }
        // 计算是否缩放
        // TODO 需要优化
        var _zoom = zoom || scaleVal - 1;
        if (_zoom != 0) {
            _zoom = _zoom > 0 ? 0.5 : 2;
            diffVal = _zoom * diffVal;
        }
        this.transform = 'scale(' + scaleVal + ', ' + scaleVal + ') rotate(' + rotateVal + 'deg) translate(' + diffVal + 'px, ' + diffVal + 'px)';
        // 渲染生效
        //@todo 原来操作dom不太好，需改进
        this.transformImg();
        // Dialog.mask(this.props.id);
    };

    ImageView.prototype.render = function render() {
        var _context,
            _this = this;

        this.isFile = !!this.props.children ? false : true;
        var file = this.props.file;

        var files = !this.isFile ? this.transToFile() : file;
        this.saveToLocal(files);
        this.name = this.getImgName(this.state.activeIndex);
        this.totalNum = this.getFileLength();
        var _showIcon = this.showIcon;
        var leftRotate = _showIcon.leftRotate;
        var rightRotate = _showIcon.rightRotate;
        var zoomIn = _showIcon.zoomIn;
        var zoomOut = _showIcon.zoomOut;

        return _react2['default'].createElement(
            _eagleUi.Dialog,
            _extends({ id: this.props.id, isClose: true, isMask: this.props.isMask }, this.props, { isHeader: false, className: 'imageview-dialog' }),
            _react2['default'].createElement(
                _Draggable2['default'],
                { elm: 'imageview-header', ref: function (draggable) {
                        _this.draggable = draggable;
                    } },
                _react2['default'].createElement(
                    'div',
                    { id: 'imageview-header', className: _classnames2['default']('eg-header', 'h4', {
                            'header-bg': true
                        }), style: {
                            textAlign: 'left',
                            cursor: 'move'
                        } },
                    this.name
                )
            ),
            _react2['default'].createElement(
                'div',
                { className: 'img-hover' },
                _react2['default'].createElement(
                    'div',
                    { className: "img-wrap " + (this.props.overflow ? 'img-wrap-hidden' : 'img-wrap-show'),
                        style: {
                            height: this.state.imgWrap.height,
                            width: this.state.imgWrap.width
                        } },
                    this.renderContent()
                ),
                _react2['default'].createElement(
                    'div',
                    { className: _classnames2['default']('icon-side left-15', this.isShowSideArrow()) },
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.countIndex).bind.call(_context, this, 'left'), className: 'upload-icon',
                        name: 'chevron-left' })
                ),
                _react2['default'].createElement(
                    'div',
                    { className: _classnames2['default']('icon-side right-15', this.isShowSideArrow()) },
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.countIndex).bind.call(_context, this, 'right'), className: 'upload-icon',
                        name: 'chevron-right' })
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'icon-box' },
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.cssEnhance).bind.call(_context, this, 'rotate', -1),
                        className: _classnames2['default']('upload-icon', this.isHideIcon('left')),
                        name: 'zuoxuanzhuan',
                        alt: '左旋转' }),
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.cssEnhance).bind.call(_context, this, 'rotate', 1),
                        className: _classnames2['default']('upload-icon', this.isHideIcon('right')),
                        name: 'youxuanzhuan',
                        alt: '右旋转' }),
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.cssEnhance).bind.call(_context, this, 'max', 1),
                        className: _classnames2['default']('upload-icon', this.isHideIcon(zoomIn)),
                        name: 'add',
                        alt: '放大' }),
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.cssEnhance).bind.call(_context, this, 'min', 1),
                        className: _classnames2['default']('upload-icon', this.isHideIcon(zoomOut)),
                        name: 'minus',
                        alt: '缩小' }),
                    _react2['default'].createElement(
                        'div',
                        { className: 'tip-num' },
                        _react2['default'].createElement(
                            'label',
                            { className: 'red-txt' },
                            this.state.activeIndex + 1
                        ),
                        _react2['default'].createElement(
                            'label',
                            { className: 'mar-5' },
                            '/'
                        ),
                        _react2['default'].createElement(
                            'label',
                            { className: 'white-txt' },
                            this.totalNum
                        )
                    )
                )
            )
        );
    };

    /**
     * is show side arrow
     * */

    ImageView.prototype.isShowSideArrow = function isShowSideArrow() {
        var len = this.getFileLength();
        return len > 1 ? '' : 'hide';
    };

    /**
     * is show icon
     * */

    ImageView.prototype.isHideIcon = function isHideIcon(key) {
        return key ? '' : 'hide';
    };

    /**
     * 放大或者拖动时不需要overHidden
     * */

    ImageView.prototype.isOverHide = function isOverHide() {
        //return this.state.sizeChange ? '' : 'over-hidden';
        return '';
    };

    /**
     * 渲染多图情况
     * */

    ImageView.prototype.renderContent = function renderContent() {
        //let {file} = this.props;
        //let files = !this.isFile ? this.transToFile() : file;
        //this.saveToLocal(files);
        return _react2['default'].createElement(
            'div',
            null,
            this.renderImage(this.state.activeIndex)
        );
    };

    ImageView.prototype.renderImage = function renderImage(index) {
        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement('img', { draggable: 'false', id: this.imgId,
                onLoad: this.onLoadHandler.bind(this),
                src: this.getImgSrc(index), alt: '',
                style: {
                    maxHeight: this.state.maxHeight + 'px',
                    maxWidth: this.state.maxWidth + 'px',
                    msTransform: this.transform,
                    WebkitTransform: this.transform,
                    MozTransform: this.transform,
                    OTransform: this.transform,
                    transform: this.transform } })
        );
    };

    /**
     * transform children to files
     * */

    ImageView.prototype.transToFile = function transToFile() {
        var file = [];
        _react2['default'].Children.forEach(this.props.children, function (options) {
            file.push({
                name: options.props.name,
                url: options.props.url
            });
        });
        return file;
    };

    /**
     * get file info push to local
     * */

    ImageView.prototype.saveToLocal = function saveToLocal(file) {
        this._file = _utils.isArray(file) ? file : _utils.toArray(file);
    };

    ImageView.prototype.getFileLength = function getFileLength() {
        return this._file ? this._file.length : 0;
    };

    ImageView.prototype.getImgOpt = function getImgOpt(index) {
        var i = this.isValidLength(index, 0, this.getFileLength() - 1) ? index : 0;
        return this._file ? this._file[i] : undefined;
    };

    ImageView.prototype.isValidLength = function isValidLength(index, min, max) {
        return index >= min ? index <= max ? true : false : false;
    };

    ImageView.prototype.getImgName = function getImgName(index) {
        var opt = this.getImgOpt(index);
        return opt ? opt.name : '图片';
    };

    ImageView.prototype.getImgSrc = function getImgSrc(index) {
        var opt = this.getImgOpt(index);
        return opt ? opt.url : '';
    };

    ImageView.prototype.getImgSize = function getImgSize(index) {
        var opt = this.getImgOpt(index),
            size = this.initSize,
            tempImg = new Image();
        if (!opt) return size;
        tempImg.src = opt.url;
        size = this.getModifySize(tempImg.width, tempImg.height, this.state.maxWidth, this.state.maxHeight);
        return size;
    };

    ImageView.prototype.isOver = function isOver(init, max) {
        return init > max;
    };

    /**
     * 是否超出最大宽高
     * 计算的有点草率啊。。。。
     *  */

    ImageView.prototype.getModifySize = function getModifySize(initW, initH, maxW, maxH) {
        var w = this.isOver(initW, maxW),
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
    };

    ImageView.prototype.countIndex = function countIndex(dir) {
        var index = parseInt(this.state.activeIndex),
            max = this.totalNum - 1,
            num = index;
        if (dir == 'left') {
            index > 0 && (num = index - 1);
            this.isLoop && index == 0 && (num = max);
        } else {
            index < max && (num = index * 1 + 1);
            this.isLoop && index == max && (num = 0);
        }
        if (num != index) {
            this.name = this.getImgName(this.props, this.isFile, num);
            this.imgId = this.uniqueId();
            this.setState({
                activeIndex: num,
                sizeChange: false
            });
            //获得imgsize，再重新渲染
            this.onLoadHandler();
        }
    };

    /**
     * 渲染旋转箭头方向
     * */

    ImageView.prototype.renderArrow = function renderArrow(key, dir) {
        var _context2;

        var dirs = {
            left: -1,
            right: 1
        };
        return _react2['default'].createElement(
            'div',
            { onClick: (_context2 = this.cssEnhance).bind.call(_context2, this, 'rotate', dirs[dir]),
                className: _classnames2['default']('arrow-warp', 'arrow-' + dir, this.isHideIcon(key)) },
            _react2['default'].createElement('div', { className: 'arrow' }),
            _react2['default'].createElement('div', { className: 'inner' })
        );
    };

    /**
     * 重置图片的状态
     */

    ImageView.prototype.resetImageStatus = function resetImageStatus() {
        this.transform = 'scale(1, 1) rotate(0deg)';
        // Dialog.mask(this.props.id);
        this.transformImg();
        this.draggable && this.draggable.reset();
    };

    return ImageView;
})(_eagleUiLibUtilsComponent2['default']);

exports['default'] = ImageView;
module.exports = exports['default'];