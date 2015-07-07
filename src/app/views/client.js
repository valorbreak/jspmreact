"use strict";

var _window;
var _document;
var clientCode;
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    _window = window;
    _document = document;

    var dynObj = {};

    // Make this available
    clientCode = {
        window: _window,
        document: _document,
        dynObj: dynObj,
        dropkick: _window['__DROPKICK__']
    };

}

export default clientCode;
