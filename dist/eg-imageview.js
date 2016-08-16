(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("eagle-ui/lib/utils/Component"), require("eagle-ui"), require("react/lib/ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "eagle-ui/lib/utils/Component", "eagle-ui", "react/lib/ReactDOM"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("eagle-ui/lib/utils/Component"), require("eagle-ui"), require("react/lib/ReactDOM")) : factory(root["React"], root["Component"], root["Eagleui"], root["ReactDom"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//export Table from './tables/Table.js';
	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _ImageView2 = __webpack_require__(2);

	var _ImageView3 = _interopRequireDefault(_ImageView2);

	exports.ImageView = _ImageView3['default'];

	if (window.Eagleui) {
	    Eagleui.Upload = exports['ImageView'];
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _eagleUiLibUtilsComponent = __webpack_require__(4);

	var _eagleUiLibUtilsComponent2 = _interopRequireDefault(_eagleUiLibUtilsComponent);

	var _eagleUi = __webpack_require__(5);

	var _classnames = __webpack_require__(6);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _reactLibReactDOM = __webpack_require__(7);

	var _reactLibReactDOM2 = _interopRequireDefault(_reactLibReactDOM);

	var _eagleUiLibUtilsDom = __webpack_require__(8);

	var _eagleUiLibUtilsDom2 = _interopRequireDefault(_eagleUiLibUtilsDom);

	var _Draggable = __webpack_require__(9);

	var _Draggable2 = _interopRequireDefault(_Draggable);

	var _cssImageviewLess = __webpack_require__(11);

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Dom = (function () {
	    function Dom(obj) {
	        _classCallCheck(this, Dom);

	        this.obj = obj;
	    }

	    Dom.prototype.offset = function offset() {

	        var element = this.obj;
	        var w = element.offsetLeft;
	        var t = element.offsetTop;
	        var node = element.offsetParent;

	        while (node && node.nodeName.toLowerCase() != document.body) {
	            t += node.offsetTop;
	            w += node.offsetLeft;
	            node = node.offsetParent;
	        }

	        return {
	            top: t,
	            left: w,
	            width: element.offsetWidth,
	            height: element.offsetHeight
	        };
	    };

	    Dom.prototype.parents = function parents(str) {
	        try {
	            var tempNode = this.obj.parentNode;
	            while (tempNode && tempNode.tagName != arguments[0].toUpperCase()) {
	                tempNode = tempNode.parentNode;
	            }
	            return [tempNode];
	        } catch (err) {
	            return [];
	        }
	    };

	    Dom.prototype.matchNode = function matchNode(element, direction, start) {
	        for (var node = element[start]; node; node = node[direction]) {
	            if (node.nodeType == 1) return node;
	        }
	        return null;
	    };

	    Dom.prototype.next = function next() {
	        return this.matchNode(this.obj, 'nextSibling', 'nextSibling');
	    };

	    Dom.prototype.prev = function prev() {
	        return this.matchNode(this.obj, 'previousSibling', 'previousSibling');
	    };

	    Dom.prototype.first = function first() {
	        return this.matchNode(this.obj, 'nextSibling', 'firstChild');
	    };

	    Dom.prototype.last = function last() {
	        return this.matchNode(this.obj, 'previousSibling', 'lastChild');
	    };

	    Dom.prototype.parent = function parent() {
	        return this.matchNode(this.obj, 'parentNode', 'parentNode');
	    };

	    Dom.prototype.children = function children() {
	        var element = this.obj;
	        for (var children = [], tmpEl = element.firstChild; tmpEl; tmpEl = tmpEl.nextSibling) {
	            if (tmpEl.nodeType == 1) children.push(tmpEl);
	        }
	        return children;
	    };

	    return Dom;
	})();

	module.exports = function (obj) {
	    return new Dom(obj);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * inspiration by https://github.com/mzabriskie/react-draggable
	 * Created by genffy on 16/7/18.
	 */
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactLibReactDOM = __webpack_require__(7);

	var _reactLibReactDOM2 = _interopRequireDefault(_reactLibReactDOM);

	var _eagleUiLibUtilsComponent = __webpack_require__(4);

	var _eagleUiLibUtilsComponent2 = _interopRequireDefault(_eagleUiLibUtilsComponent);

	var _eagleUiLibUtilsDom = __webpack_require__(8);

	var _eagleUiLibUtilsDom2 = _interopRequireDefault(_eagleUiLibUtilsDom);

	var _classnames = __webpack_require__(6);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _utils = __webpack_require__(10);

	var eventsFor = {
	    touch: {
	        start: 'touchstart',
	        move: 'touchmove',
	        stop: 'touchend'
	    },
	    mouse: {
	        start: 'mousedown',
	        move: 'mousemove',
	        stop: 'mouseup'
	    }
	};
	var dragEventFor = eventsFor.mouse;

	var Draggable = (function (_Component) {
	    _inherits(Draggable, _Component);

	    _createClass(Draggable, null, [{
	        key: 'propTypes',
	        value: {
	            bounds: _react.PropTypes.string,
	            defaultPosition: _react.PropTypes.shape({
	                x: _react.PropTypes.number,
	                y: _react.PropTypes.number
	            }),
	            position: _react.PropTypes.shape({
	                x: _react.PropTypes.number,
	                y: _react.PropTypes.number
	            })
	        },
	        enumerable: true
	    }, {
	        key: 'defaultProps',
	        value: {
	            // default is parent
	            bounds: 'parent',
	            defaultPosition: { x: 0, y: 0 },
	            position: null
	        },
	        enumerable: true
	    }]);

	    function Draggable(props) {
	        _classCallCheck(this, Draggable);

	        _Component.call(this, props);
	        this.state = {
	            dragging: false,
	            dragged: false,
	            x: props.position ? props.position.x : props.defaultPosition.x,
	            y: props.position ? props.position.y : props.defaultPosition.y,
	            slackX: 0, slackY: 0,
	            touchIdentifier: null
	        };
	    }

	    Draggable.prototype.componentWillMount = function componentWillMount() {};

	    Draggable.prototype.componentDidMount = function componentDidMount() {};

	    Draggable.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        // Set x/y if position has changed
	        if (nextProps.position && (!this.props.position || nextProps.position.x !== this.props.position.x || nextProps.position.y !== this.props.position.y)) {
	            this.setState({ x: nextProps.position.x, y: nextProps.position.y });
	        }
	    };

	    Draggable.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.setState({ dragging: false });
	    };

	    Draggable.prototype.createCoreData = function createCoreData(x, y) {
	        var draggable = this;
	        var state = draggable.state;
	        var isStart = !_utils.isNum(state.lastX);

	        if (isStart) {
	            // first start init data
	            return {
	                node: _reactLibReactDOM2['default'].findDOMNode(draggable),
	                deltaX: 0, deltaY: 0,
	                lastX: x, lastY: y,
	                x: x, y: y
	            };
	        } else {
	            // calculate data.
	            return {
	                node: _reactLibReactDOM2['default'].findDOMNode(draggable),
	                deltaX: x - state.lastX, deltaY: y - state.lastY,
	                lastX: state.lastX, lastY: state.lastY,
	                x: x, y: y
	            };
	        }
	    };

	    // factory

	    Draggable.prototype.createDraggableData = function createDraggableData(coreData) {
	        var draggable = this;
	        return {
	            node: coreData.node,
	            x: draggable.state.x + coreData.deltaX,
	            y: draggable.state.y + coreData.deltaY,
	            deltaX: coreData.deltaX,
	            deltaY: coreData.deltaY,
	            lastX: draggable.state.x,
	            lastY: draggable.state.y
	        };
	    };

	    Draggable.prototype.getPosition = function getPosition(evt, touchIdentifier) {
	        // 判断 touch
	        var touchObj = typeof touchIdentifier === 'number' ? _utils.getTouch(evt, touchIdentifier) : null;
	        if (typeof touchIdentifier === 'number' && !touchObj) return null;

	        evt = touchObj || evt;
	        var node = _reactLibReactDOM2['default'].findDOMNode(this);
	        var offsetParent = node.offsetParent;
	        var offsetParentRect = _eagleUiLibUtilsDom2['default'](offsetParent).offset();

	        var x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
	        var y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

	        return { x: x, y: y };
	    };

	    Draggable.prototype.handleDragStart = function handleDragStart(e) {
	        // Set touch identifier in component state if this is a touch event. This allows us to
	        // distinguish between individual touches on multitouch screens by identifying which
	        // touchpoint was set to this element.
	        var touchIdentifier = _utils.getTouchIdentifier(e);
	        this.setState({ touchIdentifier: touchIdentifier });

	        var _getPosition = this.getPosition(e, touchIdentifier, this /*node*/);

	        var x = _getPosition.x;
	        var y = _getPosition.y;

	        this.setState({
	            dragging: true,
	            dragged: true,
	            lastX: x,
	            lastY: y
	        });
	        _utils.addEvent(document, dragEventFor.move, this.handleDrag.bind(this));
	        _utils.addEvent(document, dragEventFor.stop, this.handleDragStop.bind(this));
	    };

	    Draggable.prototype.handleDrag = function handleDrag(e) {
	        if (!this.state.dragging) return false;

	        var _getPosition2 = this.getPosition(e, this.state.touchIdentifier, this /*node*/);

	        var x = _getPosition2.x;
	        var y = _getPosition2.y;

	        var coreData = this.createCoreData(x, y);
	        var uiData = this.createDraggableData(coreData);
	        var newState = {
	            x: uiData.x,
	            y: uiData.y
	        };
	        // TODO Keep within bounds.
	        newState.lastX = x;
	        newState.lastY = y;
	        this.setState(newState);
	    };

	    Draggable.prototype.handleDragStop = function handleDragStop(e) {
	        if (!this.state.dragging) return false;
	        var newState = {
	            dragging: false,
	            lastX: NaN,
	            lastY: NaN,
	            slackX: 0,
	            slackY: 0
	        };
	        // If this is a controlled component, the result of this operation will be to
	        // revert back to the old position. We expect a handler on `onDragStop`, at the least.
	        var controlled = Boolean(this.props.position);
	        if (controlled) {
	            var _props$position = this.props.position;
	            var _x = _props$position.x;
	            var _y = _props$position.y;

	            newState.x = _x;
	            newState.y = _y;
	        }
	        this.setState(newState);
	        _utils.removeEvent(document, dragEventFor.move, this.handleDrag);
	        _utils.removeEvent(document, dragEventFor.stop, this.handleDragStop);
	    };

	    // TODO add prefix for browser

	    Draggable.prototype.createCSSTransform = function createCSSTransform(styleObj) {
	        var value = 'translate( ' + styleObj.x + 'px, ' + styleObj.y + 'px)';
	        return {
	            'WebkitTransform': value,
	            'MozTransform': value,
	            'MsTransform': value,
	            'OTransform': value,
	            'transform': value
	        };
	    };

	    // hack event

	    Draggable.prototype.onMouseDown = function onMouseDown(e) {
	        dragEventFor = eventsFor.mouse;
	        return this.handleDragStart(e);
	    };

	    Draggable.prototype.onTouchStart = function onTouchStart(e) {
	        dragEventFor = eventsFor.touch;
	        return this.handleDragStart(e);
	    };

	    Draggable.prototype.onMouseUp = function onMouseUp(e) {
	        dragEventFor = eventsFor.mouse;
	        return this.handleDragStop(e);
	    };

	    Draggable.prototype.onTouchEnd = function onTouchEnd(e) {
	        dragEventFor = eventsFor.touch;
	        return this.handleDragStop(e);
	    };

	    Draggable.prototype.reset = function reset() {
	        var newState = {
	            x: 0,
	            y: 0
	        };
	        this.setState(newState);
	    };

	    Draggable.prototype.render = function render() {
	        var style = this.createCSSTransform(this.state);
	        // add class
	        var className = _classnames2['default'](this.props.children.props.className || '', 'draggable', {
	            'draggable-dragging': this.state.dragging,
	            'draggable-dragged': this.state.dragged
	        });
	        // TODO hack event
	        return _react2['default'].createElement(
	            'div',
	            _extends({}, this.props, {
	                className: 'img-inner',
	                onMouseDown: this.onMouseDown.bind(this),
	                onTouchStart: this.onTouchStart.bind(this),
	                onMouseUp: this.onMouseUp.bind(this),
	                onTouchEnd: this.onTouchEnd.bind(this),
	                style: style }),
	            _react2['default'].cloneElement(_react2['default'].Children.only(this.props.children), {
	                className: className,
	                style: _extends({}, this.props.children.props.style)
	            })
	        );
	    };

	    return Draggable;
	})(_eagleUiLibUtilsComponent2['default']);

	exports['default'] = Draggable;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Created by genffy on 16/7/19.
	 *
	 */
	'use strict';

	exports.__esModule = true;
	exports.outerHeight = outerHeight;
	exports.outerWidth = outerWidth;
	exports.innerHeight = innerHeight;
	exports.innerWidth = innerWidth;
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.findInArray = findInArray;
	exports.getTouch = getTouch;
	exports.getTouchIdentifier = getTouchIdentifier;
	exports.isNum = isNum;

	function outerHeight(node) {
	    // This is deliberately excluding margin for our calculations, since we are using
	    // offsetTop which is including margin. See getBoundPosition
	    var height = node.clientHeight;
	    var computedStyle = window.getComputedStyle(node);
	    height += parseInt(computedStyle.borderTopWidth, 10);
	    height += parseInt(computedStyle.borderBottomWidth, 10);
	    return height;
	}

	function outerWidth(node) {
	    // This is deliberately excluding margin for our calculations, since we are using
	    // offsetLeft which is including margin. See getBoundPosition
	    var width = node.clientWidth;
	    var computedStyle = window.getComputedStyle(node);
	    width += parseInt(computedStyle.borderLeftWidth, 10);
	    width += parseInt(computedStyle.borderRightWidth, 10);
	    return width;
	}

	function innerHeight(node) {
	    var height = node.clientHeight;
	    var computedStyle = window.getComputedStyle(node);
	    height -= parseInt(computedStyle.paddingTop, 10);
	    height -= parseInt(computedStyle.paddingBottom, 10);
	    return height;
	}

	function innerWidth(node) {
	    var width = node.clientWidth;
	    var computedStyle = window.getComputedStyle(node);
	    width -= parseInt(computedStyle.paddingLeft, 10);
	    width -= parseInt(computedStyle.paddingRight, 10);
	    return width;
	}

	function addEvent(el, event, handler) {
	    if (!el) {
	        return;
	    }
	    if (el.attachEvent) {
	        el.attachEvent('on' + event, handler);
	    } else if (el.addEventListener) {
	        el.addEventListener(event, handler, true);
	    } else {
	        el['on' + event] = handler;
	    }
	}

	function removeEvent(el, event, handler) {
	    if (!el) {
	        return;
	    }
	    if (el.detachEvent) {
	        el.detachEvent('on' + event, handler);
	    } else if (el.removeEventListener) {
	        el.removeEventListener(event, handler, true);
	    } else {
	        el['on' + event] = null;
	    }
	}

	function findInArray(array, callback) {
	    for (var i = 0, _length = array.length; i < _length; i++) {
	        if (callback.apply(callback, [array[i], i, array])) return array[i];
	    }
	}

	function getTouch(e, identifier) {
	    return e.targetTouches && findInArray(e.targetTouches, function (t) {
	        return identifier === t.identifier;
	    }) || e.changedTouches && findInArray(e.changedTouches, function (t) {
	        return identifier === t.identifier;
	    });
	}

	function getTouchIdentifier(e) {
	    if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
	    if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
	}

	function isNum(num) {
	    return typeof num === 'number' && !isNaN(num);
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./imageview.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./imageview.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports


	// module
	exports.push([module.id, ".upload-icon {\n  fill: #fff;\n  margin: 0 5px;\n  cursor: pointer;\n}\n.icon-box {\n  position: absolute;\n  bottom: 20px;\n  background: rgba(0, 0, 0, 0.7);\n  padding: 5px 10px;\n}\n.img-wrap {\n  position: relative;\n}\n.img-wrap.img-wrap-hidden {\n  overflow: hidden;\n}\n.img-wrap.img-wrap-show {\n  overflow: visible;\n}\n.img-wrap .draggable {\n  cursor: move;\n}\n.img-wrap .img-inner {\n  width: 100%;\n  height: 100%;\n}\n.img-wrap img {\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n", ""]);

	// exports


/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;