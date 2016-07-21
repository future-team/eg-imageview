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
            file: {
                name: '',
                url: ''
            },
            id: ''
        },
        enumerable: true
    }]);

    function ImageView(props, context) {
        _classCallCheck(this, ImageView);

        _Component.call(this, props, context);

        //this.imageSliderId = this.uniqueId();
        this.imgId = this.uniqueId();
        this.transform = 'scale(1, 1) rotate(0deg)';
        this.state = {
            maxHeight: document.documentElement.clientHeight * 1 - 100,
            maxWidth: document.documentElement.clientWidth * 1 - 100,
            imgWrap: {
                height: 'auto',
                width: 'auto'
            },
            modifyImgStyle: null
        };
    }

    /*static show(){
        this.transform = 'scale(1, 1) rotate(0deg)';
         Dialog.mask(this.imageSliderId);
    }*/

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

    ImageView.prototype.handleResize = function handleResize() {
        // TODO
        // this.setState({
        //     maxHeight: (document.documentElement.clientHeight*1-100),
        //     maxWidth: (document.documentElement.clientWidth*1-100),
        // })
    };

    ImageView.prototype.componentDidMount = function componentDidMount() {};

    ImageView.prototype.componentWillUnmount = function componentWillUnmount() {};

    ImageView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.transform = 'scale(1, 1) rotate(0deg)';
        this.setState({
            imgWrap: {
                height: 'auto',
                width: 'auto'
            },
            modifyImgStyle: null
        });
    };

    ImageView.prototype.onLoadHandler = function onLoadHandler(e) {
        // 获取首次加载图片的大小
        this.imgSize = _eagleUiLibUtilsDom2['default'](e.target).offset(); //.getBoundingClientRect();
        this.setState({
            imgWrap: {
                width: this.imgSize.width,
                height: this.imgSize.height
            }
        });
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
        if (type == 'rotate') {
            var tx = this.getDeg(rotateVal);
            if (tx == 0) {
                // 重置为正常
                diff = 0;
                // 正常的显示
                this.setState({
                    imgWrap: {
                        width: this.imgSize.width,
                        height: this.imgSize.height
                    },
                    modifyImgStyle: null
                });
            } else {
                // 图片的宽高比
                var imgScaleHW = this.imgSize.width / this.imgSize.height;
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
                    },
                    modifyImgStyle: {
                        width: iW,
                        height: iH
                    }
                });
            }
        } else {
            // 重置拖放的位置
            this.draggable.reset();
        }
        var diffVal = diff * 1;
        // 计算是否缩放
        var _zoom = zoom || scaleVal - 1;
        if (_zoom != 0) {
            _zoom = _zoom > 0 ? 0.5 : 2;
            diffVal = _zoom * diffVal;
        }
        this.transform = 'scale(' + scaleVal + ', ' + scaleVal + ') rotate(' + rotateVal + 'deg) translate(' + diffVal + 'px, ' + diffVal + 'px)';
        // 渲染生效
        setTimeout((function () {
            _reactLibReactDOM2['default'].findDOMNode(this.refs[this.imgId]).style.transform = this.transform;
        }).bind(this));
        _eagleUi.Dialog.mask(this.props.id);
    };

    ImageView.prototype.render = function render() {
        var _context,
            _this = this;

        var file = this.props.file;

        return _react2['default'].createElement(
            _eagleUi.Dialog,
            _extends({ id: this.props.id, isClose: true, isMask: true, title: file.name || '' }, this.props),
            _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { className: "img-wrap " + (this.props.overflow ? 'img-wrap-hidden' : 'img-wrap-show'),
                        style: {
                            height: this.state.imgWrap.height,
                            width: this.state.imgWrap.width } },
                    _react2['default'].createElement(
                        _Draggable2['default'],
                        { ref: function (draggable) {
                                _this.draggable = draggable;
                            } },
                        _react2['default'].createElement('img', { draggable: 'false', id: this.imgId,
                            onLoad: this.onLoadHandler.bind(this),
                            ref: this.imgId,
                            src: file.url, alt: '',
                            style: _extends({
                                maxHeight: this.state.maxHeight + 'px',
                                maxWidth: this.state.maxWidth + 'px',
                                msTransform: this.transform,
                                WebkitTransform: this.transform,
                                MozTransform: this.transform,
                                OTransform: this.transform,
                                transform: this.transform }, this.state.modifyImgStyle) })
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'icon-box' },
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.cssEnhance).bind.call(_context, this, 'rotate'), className: 'upload-icon', name: 'radio_unchecked', alt: '旋转' }),
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.cssEnhance).bind.call(_context, this, 'max'), className: 'upload-icon', name: 'add', alt: '放大' }),
                    _react2['default'].createElement(_eagleUi.Icon, { onClick: (_context = this.cssEnhance).bind.call(_context, this, 'min'), className: 'upload-icon', name: 'remove', alt: '缩小' })
                )
            )
        );
    };

    return ImageView;
})(_eagleUiLibUtilsComponent2['default']);

exports['default'] = ImageView;
module.exports = exports['default'];