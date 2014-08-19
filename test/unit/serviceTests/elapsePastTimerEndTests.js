//define(['sinon','clockmock'],function(sinon,clockmock){
//    
//  var elapseMillis = clockmock.elapseMillis;
//  var doStartElapseTests = function(startTime,timeElapsed,expectedDisplay){
//        describe('when start time was ' +  startTime + ' milliseconds and ' + timeElapsed + ' milliseconds have passed and timer has not been reset', function() {
//              var _startTime;
//              var _elapse;
//              beforeEach(function(){
//                this.clock = sinon.useFakeTimers();
//                _startTime = startTime;
//                _elapse = timeElapsed;
//              });
//	      
//	      //expect that time does not continue elapsing until a reset
//              it('elapsedMillis is the time elapsed', 
//                angularMocks.inject(function($rootScope,$interval,countdownService) {
//                    countdownService.startTimer(_startTime);
//        	    elapseMillis($interval,this.clock,_elapse);
//                    var timeRemainingMillis = countdownService.getTimeRemainingMillis();
//                    var elapsedMillis = countdownService.getElapsedMillis();
//		    expect(timeRemainingMillis).toEqual(0);
//                    expect(elapsedMillis).toEqual(_startTime);
//              }));
//        
//              it('getHourMinuteSecondRemainString shows ' +  expectedDisplay, 
//                angularMocks.inject(function($rootScope,$interval,countdownService) {
//                    countdownService.startTimer(_startTime);
//                    elapseMillis($interval,this.clock,_elapse);
//                    var timeRemainingMillis = countdownService.getTimeRemainingMillis();
//		    expect(timeRemainingMillis).toEqual(0);
//                    var result = countdownService.getHourMinuteSecondRemainString();
//                    expect(result).toEqual(expectedDisplay);
//              }));
//        
//              afterEach(function(){
//                this.clock.restore();
//        	_startTime = 0;
//        	_elapse = 0;
//              });
//          });
//      };
//      return {doStartElapseTests : doStartElapseTests};
//  });
