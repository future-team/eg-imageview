/**
 * inspiration by https://github.com/mzabriskie/react-draggable
 * Created by genffy on 16/7/18.
 */
import React,{PropTypes} from 'react';
import ReactDOM from 'react/lib/ReactDOM';
import Component from 'eagle-ui/lib/utils/Component';
import Dom from 'eagle-ui/lib/utils/Dom'
import classNames from 'classnames';

import {addEvent, removeEvent, isNum, getTouchIdentifier, getTouch} from './utils'

const eventsFor = {
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
let dragEventFor = eventsFor.mouse;

export default class Draggable extends Component {
    static propTypes = {
        bounds:PropTypes.string,
        defaultPosition: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        }),
        position: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })
    };

    static defaultProps = {
        // default is parent
        bounds: 'parent',
        defaultPosition: {x: 0, y: 0},
        position: null
    };

    state: {
        dragging: PropTypes.boolean,
        dragged: PropTypes.boolean,
        x: PropTypes.number,
        y: PropTypes.number,
        slackX: PropTypes.number,
        slackY: PropTypes.number,
        touchIdentifier: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            dragging: false,
            dragged: false,
            x: props.position ? props.position.x : props.defaultPosition.x,
            y: props.position ? props.position.y : props.defaultPosition.y,
            slackX: 0, slackY: 0,
            touchIdentifier: null
        };
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        // Set x/y if position has changed
        if (nextProps.position &&
            (!this.props.position ||
                nextProps.position.x !== this.props.position.x ||
                nextProps.position.y !== this.props.position.y
            )
        ) {
            this.setState({ x: nextProps.position.x, y: nextProps.position.y });
        }
    }
    componentWillUnmount() {
        this.setState({dragging: false});
    }
    createCoreData (x, y) {
        const draggable = this;
        const state = draggable.state;
        const isStart = !isNum(state.lastX);

        if (isStart) {
            // first start init data
            return {
                node: ReactDOM.findDOMNode(draggable),
                deltaX: 0, deltaY: 0,
                lastX: x, lastY: y,
                x: x, y: y
            };
        } else {
            // calculate data.
            return {
                node: ReactDOM.findDOMNode(draggable),
                deltaX: x - state.lastX, deltaY: y - state.lastY,
                lastX: state.lastX, lastY: state.lastY,
                x: x, y: y
            };
        }
    }
    // factory
    createDraggableData (coreData) {
        const draggable = this;
        return {
            node: coreData.node,
            x: draggable.state.x + coreData.deltaX,
            y: draggable.state.y + coreData.deltaY,
            deltaX: coreData.deltaX,
            deltaY: coreData.deltaY,
            lastX: draggable.state.x,
            lastY: draggable.state.y
        };
    }

    getPosition (evt, touchIdentifier) {
        // 判断 touch
        const touchObj = typeof touchIdentifier === 'number' ? getTouch(evt, touchIdentifier) : null;
        if (typeof touchIdentifier === 'number' && !touchObj) return null;

        evt = touchObj || evt;
        const node = ReactDOM.findDOMNode(this);
        const offsetParent = node.offsetParent;
        const offsetParentRect = Dom(offsetParent).offset();

        const x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
        const y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

        return {x, y};
    }

    handleDragStart (e) {
        // Set touch identifier in component state if this is a touch event. This allows us to
        // distinguish between individual touches on multitouch screens by identifying which
        // touchpoint was set to this element.
        const touchIdentifier = getTouchIdentifier(e);
        this.setState({touchIdentifier});

        const {x, y} = this.getPosition(e, touchIdentifier, this/*node*/);
        this.setState({
            dragging: true,
            dragged: true,
            lastX: x,
            lastY: y
        });
        addEvent(document, dragEventFor.move, this.handleDrag.bind(this));
        addEvent(document, dragEventFor.stop, this.handleDragStop.bind(this));
    }
    handleDrag (e) {
        if (!this.state.dragging) return false;
        const {x, y} = this.getPosition(e, this.state.touchIdentifier, this/*node*/);
        const coreData = this.createCoreData(x, y);
        const uiData = this.createDraggableData(coreData);
        const newState = {
            x: uiData.x,
            y: uiData.y
        };
        // TODO Keep within bounds.
        newState.lastX = x;
        newState.lastY = y;
        this.setState(newState);
    }

    handleDragStop (e) {
        if (!this.state.dragging) return false;
        const newState = {
            dragging: false,
            lastX: NaN,
            lastY: NaN,
            slackX: 0,
            slackY: 0
        };
        // If this is a controlled component, the result of this operation will be to
        // revert back to the old position. We expect a handler on `onDragStop`, at the least.
        const controlled = Boolean(this.props.position);
        if (controlled) {
            const {x, y} = this.props.position;
            newState.x = x;
            newState.y = y;
        }
        this.setState(newState);
        removeEvent(document, dragEventFor.move, this.handleDrag);
        removeEvent(document, dragEventFor.stop, this.handleDragStop);
    }
    // TODO add prefix for browser
    createCSSTransform(styleObj) {
        const value = `translate( ${styleObj.x}px, ${styleObj.y}px)`;
        return {
            'WebkitTransform': value,
            'MozTransform':    value,
            'MsTransform':     value,
            'OTransform':      value,
            'transform':       value
        }
    }
    // hack event
    onMouseDown(e) {
        dragEventFor = eventsFor.mouse;
        return this.handleDragStart(e);
    }
    onTouchStart(e) {
        dragEventFor = eventsFor.touch;
        return this.handleDragStart(e);
    }
    onMouseUp(e) {
        dragEventFor = eventsFor.mouse;
        return this.handleDragStop(e);
    }
    onTouchEnd(e) {
        dragEventFor = eventsFor.touch;
        return this.handleDragStop(e);
    }
    reset() {
        const newState = {
            x: 0,
            y: 0
        };
        this.setState(newState)
    }
    render() {
        const style = this.createCSSTransform(this.state);
        // add class
        const className = classNames((this.props.children.props.className || ''), 'draggable', {
            'draggable-dragging': this.state.dragging,
            'draggable-dragged': this.state.dragged
        });
        // TODO hack event
        return (
            <div {...this.props}
                className="img-inner"
                onMouseDown = {this.onMouseDown.bind(this)}
                onTouchStart = {this.onTouchStart.bind(this)}
                onMouseUp = {this.onMouseUp.bind(this)}
                onTouchEnd = {this.onTouchEnd.bind(this)}
                style={style}>
                {React.cloneElement(React.Children.only(this.props.children), {
                    className: className,
                    style: {...this.props.children.props.style},
                })}
            </div>
        );
    }
}