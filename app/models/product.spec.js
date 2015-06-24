'use strict';
var assert = require('assert');
var Product = require('../models/product');

describe('Product Model', function(){
    // asynchronous code needs the 'done' parameter
    it('Product can be saved', function(){
        var product = new Product();
        product.save();
        assert.equal(product.saved,true, 'product.saved must be true');
    });
});