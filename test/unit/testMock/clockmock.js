// relies on sinon.js 
//
define([],function(){
'use strict';

  var elapseMillis = function(sinonClock,millis){
       sinonClock.tick(millis);
  };

  return {
      elapseMillis : elapseMillis
  };

});

