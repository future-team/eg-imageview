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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLibReactDOM = require('react/lib/ReactDOM');

var _reactLibReactDOM2 = _interopRequireDefault(_reactLibReactDOM);

var _eagleUiLibUtilsComponent = require('eagle-ui/lib/utils/Component');

var _eagleUiLibUtilsComponent2 = _interopRequireDefault(_eagleUiLibUtilsComponent);

var _eagleUiLibUtilsDom = require('eagle-ui/lib/utils/Dom');

var _eagleUiLibUtilsDom2 = _interopRequireDefault(_eagleUiLibUtilsDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

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
        // console.dir(props.position);
        this.state = {
            dragging: false,
            dragged: false,
            x: props.position ? props.position.x : props.defaultPosition.x,
            y: props.position ? props.position.y : props.defaultPosition.y,
            slackX: 0, slackY: 0,
            touchIdentifier: null
        };
        this.id = props.elm;
    }

    Draggable.prototype.componentWillMount = function componentWillMount() {};

    Draggable.prototype.componentDidMount = function componentDidMount() {
        // var elm = this.getDElement();
        // if(elm){
        //     setTimeout(()=>{
        //         this.setState({
        //             x:elm.offsetWidth,
        //             y:elm.offsetHeight
        //         })
        //     })
        // }
    };

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
        var elm = this.getDElement();
        if (isStart) {
            // first start init data
            return {
                node: elm ? elm : _reactLibReactDOM2['default'].findDOMNode(draggable),
                deltaX: 0, deltaY: 0,
                lastX: x, lastY: y,
                x: x, y: y
            };
        } else {
            // calculate data.
            return {
                node: elm ? elm : _reactLibReactDOM2['default'].findDOMNode(draggable),
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
        if (this.id) {
            return '-webkit-transform:' + value + ';transform:' + value + ';';
        }
        return {
            'WebkitTransform': value,
            'MozTransform': value,
            'msTransform': value,
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
        var _this = this;

        var elm = this.getDElement();
        if (elm) {
            setTimeout(function () {
                _this.setState({
                    x: -elm.offsetWidth / 2,
                    y: -elm.offsetHeight / 2
                });
            });
        } else {
            var newState = {
                x: 0,
                y: 0
            };
            this.setState(newState);
        }
    };

    Draggable.prototype.getDElement = function getDElement() {
        if (this.id) {
            var elm = document.getElementById(this.id);
            if (elm) {
                return elm.parentNode.parentNode.parentNode;
            }
        }

        return null;
    };

    Draggable.prototype.render = function render() {
        var style = this.createCSSTransform(this.state);
        // add class
        var className = _classnames2['default'](this.props.children.props.className || '', 'draggable', {
            'draggable-dragging': this.state.dragging,
            'draggable-dragged': this.state.dragged
        });
        // TODO hack event
        var elm = this.getDElement();
        if (elm) {
            elm.style.cssText = style;
        }
        return _react2['default'].createElement(
            'div',
            _extends({}, this.props, {
                className: 'img-inner',
                onMouseDown: this.onMouseDown.bind(this),
                onTouchStart: this.onTouchStart.bind(this),
                onMouseUp: this.onMouseUp.bind(this),
                onTouchEnd: this.onTouchEnd.bind(this),
                style: this.id ? {} : style }),
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