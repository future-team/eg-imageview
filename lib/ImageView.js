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
    }

    /*static show(){
        this.transform = 'scale(1, 1) rotate(0deg)';
         Dialog.mask(this.imageSliderId);
    }*/

    ImageView.prototype.cssEnhance = function cssEnhance(type) {

        var val = this.transform.match(/\d+\.?\d*/g);

        var set = function set(zoom, rotate) {
            return 'scale(' + (val[0] * 1 + zoom) + ', ' + (val[0] * 1 + zoom) + ') rotate(' + (val[2] * 1 + rotate) + 'deg)';
        };

        if (val && val.length >= 3) {
            switch (type) {
                case 'rotate':
                    //val[2] = val[2]>=270?0
                    val = set(0, 90);
                    break;
                case 'max':
                    val = set(0.5, 0);
                    break;
                case 'min':
                    val = set(-0.5, 0);
                    break;
            }

            this.transform = val;
            _reactLibReactDOM2['default'].findDOMNode(this.refs[this.imgId]).style.transform = val;
        }
    };

    ImageView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.transform = 'scale(1, 1) rotate(0deg)';
    };

    ImageView.prototype.render = function render() {
        var _context;

        var file = this.props.file;

        return _react2['default'].createElement(
            _eagleUi.Dialog,
            _extends({ id: this.props.id, isClose: true, isMask: true, title: file.name || '' }, this.props),
            _react2['default'].createElement(
                'div',
                { style: {
                        overflow: 'hidden'
                    } },
                _react2['default'].createElement('img', { ref: this.imgId, src: file.url, alt: '', style: { width: "100%", maxHeight: document.documentElement.clientHeight * 1 - 100 + 'px', transform: this.transform } }),
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