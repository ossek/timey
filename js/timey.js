define(['parameterCheck'],function(parameterCheck){
  'use strict';
   
  var isInteger = parameterCheck.isInteger;
  
      var _startDate;
      var _countdownFromMillis;
      var _timeoutId;
      //start these each at 0 in the case where we want to 
      //run a timer with 0 value
      var _elapsedMillis = 0;
      var _remain = 0;
      var _updatePeriodMillis = 1000;


      var startTimer = function(countdownFromMillis){
	      startTimerWithUpdatePeriodMillis(countdownFromMillis,1000);
      };
      
      var startTimerWithUpdatePeriodMillis = function(countdownFromMillis,updatePeriodMillis){
  	if(typeof(countdownFromMillis) !== "number" || !isInteger(countdownFromMillis)){
            throw "countdownFromMillis must be an integer";
  	}
  	if(countdownFromMillis < 0){
            throw "cannot start timer with a value < 0";
  	}
  	_countdownFromMillis = countdownFromMillis;
  	_startDate = Date.now(); 
  	_timeoutId = window.setInterval(function(){
            updateTimeRemaining();
            }, _updatePeriodMillis);
      };

      var GetUpdatePeriodMillis = function(){
	      return _updatePeriodMillis;
      };

  
      var updateTimeRemaining = function() {
	var datenow = Date.now();
        _elapsedMillis = datenow - _startDate;
        if (_elapsedMillis >= _countdownFromMillis){
	    //the elapsed millis should not show elapsing past the interval, 
	    //since we are approximating stopping there
	        _elapsedMillis = _countdownFromMillis;
                cancelCountdown(_timeoutId);
                _remain = 0;
        }
        else{
          //if this calculation is delayed, could still be negative
          _remain = _countdownFromMillis - _elapsedMillis;
        }
      };
  
      var getTimeRemainingMillis = function(){
  	return _remain;
      };
  
      var getElapsedMillis = function(){
  	return _elapsedMillis;
      };
  
      var getCountdownHourMinuteSecString = function(){
  	var countdownValue = getHourMinuteSecondRemainString(getTimeRemainingMillis);
  	return countdownValue;
      };
  
      var cancelCountdown = function(){
        window.clearInterval(_timeoutId);
      };
  
      var getHourMinuteSecondRemainString = function() {
  	return getHourMinuteSecondString(_remain);
      };
  
      var reset = function(){
  	cancelCountdown();
          _startDate = 0;
          _countdownFromMillis = 0;
          _timeoutId = 0;
          //start these each at 0 in the case where we want to 
          //run a timer with 0 value
          _elapsedMillis = 0;
          _remain = 0;
      };
  
      var getHourMinuteSecondString = function(millis) {
  	//this constructor is milliseconds with respect to UTC epoch start
  	// so showing its value with non-UTC methods will adjust for 
  	// browser's timezone (i think that's what's happening?)
  	var dateFromMillis = new Date(millis); 
  	var utcString = dateFromMillis.toUTCString();
          var outputString = utcString.slice(-12,utcString.length - 4);
  	return outputString;
      };
  
      return {
  	startTimer : startTimer,
  	getTimeRemainingMillis: getTimeRemainingMillis,
        getCountdownHourMinuteSecString : getCountdownHourMinuteSecString,
  	getHourMinuteSecondRemainString: getHourMinuteSecondRemainString,
        getElapsedMillis: getElapsedMillis,
  	cancelCountdown : cancelCountdown,
	timeRemaining : _remain,
  	reset : reset,
        GetUpdatePeriodMillis : GetUpdatePeriodMillis,
        getHourMinuteSecondString : getHourMinuteSecondString
      };
});

