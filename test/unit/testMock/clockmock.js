// relies on sinon.js 
//
define([],function(){
'use strict';

  var elapseMillis = function(intervalMock,sinonClock,millis){
       sinonClock.tick(millis);
       intervalMock.flush(millis);
  };

  return {
      elapseMillis : elapseMillis
  };

});

