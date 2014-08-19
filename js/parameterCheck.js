//from 
//http://stackoverflow.com/questions/1019515/javascript-test-for-an-integer

define([],function(){
  var INTREGEX = /^\d+$/;

  var isInteger = function(testValue){
     return INTREGEX.test(testValue);
  };

  return {
      isInteger : isInteger
  };

});
