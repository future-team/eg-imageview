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