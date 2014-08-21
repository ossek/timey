define(['clockmock','sinon','timey'],function(clockmock,sinon,timey){
	'use strict'
    var elapseMillis = clockmock.elapseMillis;
  
    var doStartElapseTests = function(startTime,timeElapsedMillis,expectedDisplay){
        var runTests = function(){
          describe('when start time was ' +  startTime + ' milliseconds and ' + timeElapsedMillis + ' milliseconds have passed ', function() {
                var _startTime;
                var _elapse;

                beforeEach(function(){
                  this.clock = sinon.useFakeTimers();
                  _startTime = startTime;
                  _elapse = timeElapsedMillis;
                });

                afterEach(function(){
                  this.clock.restore();
          	_startTime = 0;
          	_elapse = 0;
                });

		/**
		 note here that, when elapsing a fake timer f millis, if getElapsedMillis is
		 simply reporting a variable that is updated at some period t millis,
		 assuming that x periods have occured, f - tx cannot be reported
		 when x >=1 and f < t(x+1). for example t = 1000, f = 1001; t can only have 
		 been called 1 time so x = 1.  f-xt is 1001-(1)(1000)=1, so the
		 additional 1 millis cannot be reported until x = 2 (which happens
		 when f >= 2000 and < 3000).

		 in other words, the remainder of f/t cannot be reported.
		 **/
                it('elapsedMillis is supposed to be the time elapsed, up to nearest less update period', function(){
		    timey.startTimer(_startTime);
		    var updatePeriodMillis = timey.GetUpdatePeriodMillis();
          	    elapseMillis(this.clock,_elapse);
                    var elapsedMillis = timey.getElapsedMillis();
		    var remainder = _elapse % updatePeriodMillis;
		    var periodAdjustedElapse = _elapse - remainder;
                    expect(elapsedMillis).toEqual(periodAdjustedElapse);
		});
                
                it('timeRemaining is supposed to be the time remaining', function(){
                    timey.startTimer(_startTime);
		    var updatePeriodMillis = timey.GetUpdatePeriodMillis();
          	    elapseMillis(this.clock,_elapse);
                    var timeRemainingMillis = timey.getTimeRemainingMillis();
		    var remainder = _elapse % updatePeriodMillis;
		    var periodAdjustedElapse = _elapse - remainder;
                    expect(timeRemainingMillis).toEqual(_startTime - periodAdjustedElapse);
                });
  
                it('elapsedMillis + timeRemainingMillis should == startime', function() {
                      timey.startTimer(_startTime);
                      elapseMillis(this.clock,_elapse);
                      var elapsedMillis = timey.getElapsedMillis();
                      var timeRemainingMillis = timey.getTimeRemainingMillis();
                      expect(elapsedMillis + timeRemainingMillis).toEqual(startTime);
                });
//          
//          
//                it('getHourMinuteSecondRemainString shows ' +  expectedDisplay, 
//                  angularMocks.inject(function($rootScope,$interval,timey) {
//                      timey.startTimer(_startTime);
//                      elapseMillis($interval,this.clock,_elapse);
//                      var result = timey.getHourMinuteSecondRemainString();
//                      expect(result).toEqual(expectedDisplay);
//                }));
          
            });
        };
        return runTests;
    };
  
    return {
        doStartElapseTests : doStartElapseTests
    };
  });

