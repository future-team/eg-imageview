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

var _reactLibReactDOM = require('react/lib/ReactDOM');

var _reactLibReactDOM2 = _interopRequireDefault(_reactLibReactDOM);

var _eagleUiLibUtilsDom = require('eagle-ui/lib/utils/Dom');

var _eagleUiLibUtilsDom2 = _interopRequireDefault(_eagleUiLibUtilsDom);

var _Draggable = require('./Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

var _cssImageviewLess = require('../css/imageview.less');

var _cssImageviewLess2 = _interopRequireDefault(_cssImageviewLess);

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
            activeIndex: 0
        },
        enumerable: true
    }]);

    function ImageView(props, context) {
        _classCallCheck(this, ImageView);

        _Component.call(this, props, context);
        //this.imageSliderId = this.uniqueId();
        this.imgId = this.uniqueId();
        //default total 1
        this.totalNum = 1;
        //imgs sizes
        this.imgSizes = [];
        this.transform = 'scale(1, 1) rotate(0deg)';
        this.state = {
            maxHeight: document.documentElement.clientHeight * 1 - 100,
            maxWidth: document.documentElement.clientWidth * 1 - 100,
            imgWrap: {
                height: 'auto',
                width: 'auto'
            },
            activeIndex: this.props.activeIndex || 0,
            name: '图片',
            dirClass: 'left0',
            sizeChange: false
        };
        this.initSize = {
            height: 'auto',
            width: 'auto'
        };
        this.isLoop = this.props.isLoop;
    }

    ImageView.prototype.cssEnhance = function cssEnhance(type) {
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
            // this.transform = val;
            this.calculatePosition(zoom, rotate, type);
        }
    };

    ImageView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.transform = 'scale(1, 1) rotate(0deg)';
        var index = nextProps.activeIndex;
        this.setState({
            imgWrap: {
                height: 'auto',
                width: 'auto'
            },
            activeIndex: typeof index == 'undefined' ? this.state.activeIndex : index
        });
        this.isLoop = nextProps.isLoop;
    };

    /**
     * 获取img size & reset
     * */

    ImageView.prototype.onLoadHandler = function onLoadHandler(e) {
        // 获取加载图片的大小
        this.imgSize = this.getImgSize(this.state.activeIndex);
        var size = this.imgSize;
        this.setState({
            imgWrap: size
        });
        //reset
        this.transform = 'scale(1, 1) rotate(0deg)';
    };

    ImageView.prototype.getDeg = function getDeg(deg) {
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
    };

    /**
     *
     * @param zoom 放大/缩小
     * @param rotate 旋转
     * @param type 操作类型
     */

    ImageView.prototype.calculatePosition = function calculatePosition(zoom, rotate, type) {
        var vals = this.transform.match(/-?\d+\.?\d*/g);
        var scaleVal = vals[0] * 1 + zoom;
        var rotateVal = vals[2] * 1 + rotate;
        var diff = vals[3] || vals[4] || 0;
        var imgSize = this.imgSize;
        if (type == 'rotate') {
            var tx = this.getDeg(rotateVal);
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
                var iH = this.state.imgWrap.height;
                var iW = this.state.imgWrap.width;
                var mW = this.state.maxWidth;
                var mH = this.state.maxHeight;
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
                diff = tx * (iW - iH) / 2;
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
        setTimeout((function () {
            var domStyle = _reactLibReactDOM2['default'].findDOMNode(this.refs[this.imgId]).style;
            domStyle.WebkitTransform = this.transform;
            domStyle.msTransform = this.transform;
            domStyle.OTransform = this.transform;
            domStyle.transform = this.transform;
        }).bind(this));
        this.setState({
            sizeChange: true
        });
        //Dialog.mask(this.props.id);
    };

    ImageView.prototype.render = function render() {
        var _context,
            _this = this;

        this.isFile = !!this.props.children ? false : true;
        this.name = this.getImgName(this.state.activeIndex);
        this.totalNum = this.getFileLength();
        return _react2['default'].createElement(
            _eagleUi.Dialog,
            _extends({ id: this.props.id, isClose: true, isMask: this.props.isMask, title: this.name }, this.props),
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
                    _react2['default'].createElement(
                        _Draggable2['default'],
                        { ref: function (draggable) {
                                _this.draggable = draggable;
                            } },
                        this.renderContent()
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: _classnames2['default']('icon-side left-15', this.isShowSideArrow()) },
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.countIndex).bind.call(_context, this, 'left'), className: 'upload-icon',
                        name: 'chevron_left' })
                ),
                _react2['default'].createElement(
                    'div',
                    { className: _classnames2['default']('icon-side right-15', this.isShowSideArrow()) },
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.countIndex).bind.call(_context, this, 'right'), className: 'upload-icon',
                        name: 'chevron_right' })
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'icon-box' },
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.cssEnhance).bind.call(_context, this, 'rotate'), className: 'upload-icon',
                        name: 'radio_unchecked', alt: '旋转' }),
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.cssEnhance).bind.call(_context, this, 'max'), className: 'upload-icon', name: 'add',
                        alt: '放大' }),
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.cssEnhance).bind.call(_context, this, 'min'), className: 'upload-icon', name: 'remove',
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
     * 放大或者拖动时不需要overHidden
     * */

    ImageView.prototype.isOverHide = function isOverHide() {
        return this.state.sizeChange ? '' : 'over-hidden';
    };

    /**
     * 渲染多图情况
     * */

    ImageView.prototype.renderContent = function renderContent() {
        var file = this.props.file;

        var files = !this.isFile ? this.transToFile() : file;
        this.saveToLocal(files);
        return _react2['default'].createElement(
            'div',
            null,
            this.renderImage(this.state.activeIndex)
        );
    };

    ImageView.prototype.renderImage = function renderImage(index) {
        return _react2['default'].createElement(
            'div',
            { className: this.isOverHide() },
            _react2['default'].createElement('img', { draggable: 'false', id: this.imgId,
                onLoad: this.onLoadHandler.bind(this),
                ref: this.imgId,
                className: this.state.dirClass,
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
        /*size = {
            width: tempImg.width,
            height: tempImg.height
        };*/
        return size;
    };

    ImageView.prototype.isOver = function isOver(init, max) {
        return init > max;
    };

    /**
     * 是否超出最大宽高
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

    /**
     * trim imgsize if over maxSize
     * */

    ImageView.prototype.getTrimSize = function getTrimSize() {};

    /**
     * @param isLoop 是否循环
     * @param cur current index
     * @param dir next show direction
     * */

    ImageView.prototype.getShowNum = function getShowNum(cur, dir, isLoop) {};

    ImageView.prototype.countIndex = function countIndex(dir) {
        var _this2 = this;

        var index = parseInt(this.state.activeIndex),
            max = this.totalNum - 1;
        var dirClass = 'moveLeft',
            num = index;
        if (dir == 'left') {
            index > 0 && (num = index - 1);
            this.isLoop && index == 0 && (num = max);
        } else {
            dirClass = 'moveRight';
            index < max && (num = index * 1 + 1);
            this.isLoop && index == max && (num = 0);
        }
        if (num != index) {
            this.name = this.getImgName(this.props, this.isFile, num);
            this.imgId = this.uniqueId();
            this.setState({
                activeIndex: num,
                dirClass: dirClass,
                sizeChange: false
            }, function () {
                setTimeout(function () {
                    _this2.setState({
                        dirClass: 'left0'
                    });
                }, 10);
            });
        }
    };

    return ImageView;
})(_eagleUiLibUtilsComponent2['default']);

exports['default'] = ImageView;
module.exports = exports['default'];