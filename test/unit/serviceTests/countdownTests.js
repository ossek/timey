define(['clockmock','sinon','timey'],function(clockmock,sinon,timey){
	'use strict'
    var elapseMillis = clockmock.elapseMillis;
  
    var doStartElapseTests = function(startTime,timeElapsed,expectedDisplay){
        var runTests = function(){
          describe('when start time was ' +  startTime + ' milliseconds and ' + timeElapsed + ' milliseconds have passed ', function() {
                var _startTime;
                var _elapse;

                beforeEach(function(){
                  //this.clock = sinon.useFakeTimers();
		  jasmine.clock().install();
                  _startTime = startTime;
                  _elapse = timeElapsed;
                });
  
                it('elapsedMillis is supposed to be the time elapsed', function(){
		    timey.startTimer(_startTime);
          	    //elapseMillis($interval,this.clock,_elapse);
		    jasmine.clock().tick(_elapse);
                    var elapsedMillis = countdownService.getElapsedMillis();
                    expect(elapsedMillis).toEqual(_elapse);
		});
                
//                it('timeRemaining is supposed to be the time remaining', 
//                  angularMocks.inject(function($rootScope,$interval,countdownService) {
//                      countdownService.startTimer(_startTime);
//          	    elapseMillis($interval,this.clock,_elapse);
//                      var elapsedMillis = countdownService.getElapsedMillis();
//                      expect(elapsedMillis).toEqual(_elapse);
//                }));
//  
//                it('elapsedMillis + timeRemainingMillis should == startime', 
//                  angularMocks.inject(function($rootScope,$interval,countdownService) {
//                      countdownService.startTimer(_startTime);
//                      elapseMillis($interval,this.clock,_elapse);
//                      var elapsedMillis = countdownService.getElapsedMillis();
//                      var timeRemainingMillis = countdownService.getTimeRemainingMillis();
//                      expect(elapsedMillis + timeRemainingMillis).toEqual(startTime);
//                      expect(elapsedMillis).toEqual(_elapse);
//                }));
//          
//          
//                it('getHourMinuteSecondRemainString shows ' +  expectedDisplay, 
//                  angularMocks.inject(function($rootScope,$interval,countdownService) {
//                      countdownService.startTimer(_startTime);
//                      elapseMillis($interval,this.clock,_elapse);
//                      var result = countdownService.getHourMinuteSecondRemainString();
//                      expect(result).toEqual(expectedDisplay);
//                }));
          
                afterEach(function(){
                  //this.clock.restore();
		  jasmine.clock().uninstall();
          	_startTime = 0;
          	_elapse = 0;
                });
            });
        };
        return runTests;
    };
  
    return {
        doStartElapseTests : doStartElapseTests
    };
  });

