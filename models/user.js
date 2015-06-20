"use strict";

var User = function () {
    this.uid = 0;
    this.name = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.description = '';
    this.isNew = true;
    this.sku = '';
    this.created = new Date();
    this.changed = new Date();
    this.saved = false;
};

User.prototype.sayHello = function(){

};

User.prototype.save = function() {
    this.saved = true;
};

module.exports = User;