define(['sinon','clockmock','timey'],function(sinon,clockmock,timey){
'use strict';    
  var elapseMillis = clockmock.elapseMillis;
  var doStartElapseTests = function(startTime,timeElapsed,expectedDisplay){
        describe('when start time was ' +  startTime + ' milliseconds and ' + timeElapsed + ' milliseconds have passed and timer has not been reset', function() {
              var _startTime;
              var _elapse;
              beforeEach(function(){
                this.clock = sinon.useFakeTimers();
                _startTime = startTime;
                _elapse = timeElapsed;
              });
	      
	      //expect that time does not continue elapsing until a reset
              it('elapsedMillis is the time elapsed', function() {
                    timey.startTimer(_startTime);
        	    elapseMillis(this.clock,_elapse);
                    var timeRemainingMillis = timey.getTimeRemainingMillis();
                    var elapsedMillis = timey.getElapsedMillis();
		    expect(timeRemainingMillis).toEqual(0);
                    expect(elapsedMillis).toEqual(_startTime);
              });
        
              it('getHourMinuteSecondRemainString shows ' +  expectedDisplay, function() {
                    timey.startTimer(_startTime);
                    elapseMillis(this.clock,_elapse);
                    var timeRemainingMillis = timey.getTimeRemainingMillis();
		    expect(timeRemainingMillis).toEqual(0);
                    var result = timey.getHourMinuteSecondRemainString();
                    expect(result).toEqual(expectedDisplay);
              });
        
              afterEach(function(){
                this.clock.restore();
        	_startTime = 0;
        	_elapse = 0;
              });
          });
      };
      return {doStartElapseTests : doStartElapseTests};
  });
