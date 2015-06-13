import {bootstrap} from './bootstrap';

var mapMe = function(x){
    return x*2;
}

var newMap = (x) => (x*2);
bootstrap();
console.log('new thing ever');
console.log(mapMe(5),'es6 maps');
console.log(newMap(5),'New Maps');
