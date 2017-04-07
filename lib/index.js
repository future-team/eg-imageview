'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ImageView2 = require('./ImageView');

var _ImageView3 = _interopRequireDefault(_ImageView2);

exports.ImageView = _ImageView3['default'];

if (window.Eagleui) {
    Eagleui.Upload = exports['ImageView'];
}