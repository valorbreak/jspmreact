"use strict";

var Product = function () {
    this.title = '';
    this.type = [
        'car'
    ];
    this.keywords = [];
    this.description = '';
    this.uid = 0;
    this.isNew = true;
    this.sku = '';
    this.created = new Date();
    this.saved = false;
    this.price = 0;
    this.images = [

    ];
};

Product.prototype.sayHello = function(){

};

Product.prototype.save = function() {
    this.saved = true;
};

module.exports = Product