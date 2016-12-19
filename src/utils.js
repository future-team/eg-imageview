/**
 * Created by genffy on 16/7/19.
 *
 */
export function outerHeight(node) {
    // This is deliberately excluding margin for our calculations, since we are using
    // offsetTop which is including margin. See getBoundPosition
    let height = node.clientHeight;
    const computedStyle = window.getComputedStyle(node);
    height += parseInt(computedStyle.borderTopWidth, 10);
    height += parseInt(computedStyle.borderBottomWidth, 10);
    return height;
}

export function outerWidth(node) {
    // This is deliberately excluding margin for our calculations, since we are using
    // offsetLeft which is including margin. See getBoundPosition
    let width = node.clientWidth;
    const computedStyle = window.getComputedStyle(node);
    width += parseInt(computedStyle.borderLeftWidth, 10);
    width += parseInt(computedStyle.borderRightWidth, 10);
    return width;
}
export function innerHeight(node) {
    let height = node.clientHeight;
    const computedStyle = window.getComputedStyle(node);
    height -= parseInt(computedStyle.paddingTop, 10);
    height -= parseInt(computedStyle.paddingBottom, 10);
    return height;
}

export function innerWidth(node) {
    let width = node.clientWidth;
    const computedStyle = window.getComputedStyle(node);
    width -= parseInt(computedStyle.paddingLeft, 10);
    width -= parseInt(computedStyle.paddingRight, 10);
    return width;
}

export function addEvent(el, event, handler) {
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

export function removeEvent(el, event, handler) {
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

export function findInArray(array:Array<any>, callback:Function):any {
    for (let i = 0, length = array.length; i < length; i++) {
        if (callback.apply(callback, [array[i], i, array])) return array[i];
    }
}

export function getTouch(e, identifier) {
    return (e.targetTouches && findInArray(e.targetTouches, t => identifier === t.identifier)) ||
        (e.changedTouches && findInArray(e.changedTouches, t => identifier === t.identifier));
}

export function getTouchIdentifier(e) {
    if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
    if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
}

export function isNum(num) {
    return typeof num === 'number' && !isNaN(num)
}
export function isArray(obj) {
    return obj instanceof Array;
}
export function toArray(obj) {
    let arr = [];
    arr.push(obj);
    return arr;
}
export function isValidNum(index,min,max){
    return index >= min ? (index <= max ? true:false):false;
}