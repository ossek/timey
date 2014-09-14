define(['countdownTests','elapsePastTimerEndTests','sinon','clockmock','timey'], 
		function(countdownTests,elapsePastTimerEndTests,sinon,clockmock,timey){
'use strict';

  describe('service', function() {
    beforeEach(function(){});
  
    describe('when start time was 0', function() {
        it('elapsedMillis + timeRemainingMillis should == startime', function() {
                timey.startTimer(0);
                var elapsedMillis = timey.getElapsedMillis();
                var timeRemainingMillis = timey.getTimeRemainingMillis();
          expect(elapsedMillis + timeRemainingMillis).toEqual(0);
        });
    });

    //start at 3 s, elapse 1s 1 ms
    var testRunFor3000_1001 = countdownTests.doStartElapseTests(3000,1001,"00:00:02");
    testRunFor3000_1001();
  
  });

  //start at 15 min, elapse 6 min, 27 s
  var testRun900000_387000 = countdownTests.doStartElapseTests(900000,387000,"00:08:33");
  testRun900000_387000();
  //elapse the time past the end of the startTime
  var testRun900000_1000000 = elapsePastTimerEndTests.doStartElapseTests(900000,1000000,"00:00:00");
  
  describe('when start time is -1', function(){
      it('exception is thrown', function(){
            var test = function(){
              timey.startTimer(-1);
            };
            expect(test).toThrow();
      });
  });
  
  //try with a string
  describe('when start time is "dale"', function(){
      it('exception is thrown', function(){
            var test = function(){
              timey.startTimer("dale");
        };
            expect(test).toThrow();
       });
  });
  
  describe('when start time is -1', function(){
      it('exception is thrown', function(){
            var test = function(){
              timey.startTimer(-1);
        };
            expect(test).toThrow();
        });
  });


  
  //try with -0 because javascript is weird and that seems like something it would do
  //normal cases with 0
  describe('when start time was ' +  '0' + ' milliseconds and ' + '1001' + ' milliseconds have passed ', function() {
      var _startTime;
      var _elapse;
      var expectedDisplay;
      var elapseMillis;

      beforeEach(function(){
        this.clock = sinon.useFakeTimers();
        _startTime = 0;
        _elapse = 1001;
        elapseMillis = clockmock.elapseMillis;
        expectedDisplay = '00:00:00';
      });
  
      it('elapsedMillis is supposed to be 0', function() {
            timey.startTimer(_startTime);
            elapseMillis(this.clock,_elapse);
            var elapsedMillis = timey.getElapsedMillis();
            expect(elapsedMillis).toEqual(0);
      });
      
      it('timeRemaining is supposed to be 0', function() {
            timey.startTimer(_startTime);
            elapseMillis(this.clock,_elapse);
            var elapsedMillis = timey.getElapsedMillis();
            expect(elapsedMillis).toEqual(0);
      });
  
      it('elapsedMillis + timeRemainingMillis should == 0', function() {
            timey.startTimer(_startTime);
            elapseMillis(this.clock,_elapse);
            var elapsedMillis = timey.getElapsedMillis();
            var timeRemainingMillis = timey.getTimeRemainingMillis();
            expect(elapsedMillis + timeRemainingMillis).toEqual(0);
            expect(elapsedMillis).toEqual(0);
      });
  
      it('getHourMinuteSecondRemainString shows ' +  expectedDisplay, 
        (function() {
            timey.startTimer(_startTime);
            elapseMillis(this.clock,_elapse);
            var result = timey.getHourMinuteSecondRemainString();
            expect(result).toEqual(expectedDisplay);
      }));
  
      afterEach(function(){
        this.clock.restore();
      _startTime = 0;
      _elapse = 0;
      });
  });

  //try with input larger than 99 hours
  //
  //try with a non-integer parameter
  describe('when start time is 3000.07', function(){
      it('exception is thrown', function(){
            var test = function(){
              timey.startTimer("3000.07");
        };
            expect(test).toThrow();
       });
  });

  var testRunFor3000pt0_1001 = countdownTests.doStartElapseTests(3000.0,1001,"00:00:02");
  testRunFor3000pt0_1001();

  //try getting the string when there's not time set
  
  //try reset
  describe('reset tests',function(){
	 
    beforeEach(function(){
          this.clock = sinon.useFakeTimers();
        });


    describe('when timer is reset with time remaining', function(){
            it('has elapsed time 0', function(){
              timey.startTimer(8000);
              clockmock.elapseMillis(this.clock,3000);
              timey.reset();
              var result = timey.getTimeRemainingMillis();
              expect(result).toEqual(0);
            });
    });

    describe('when timer is reset with no time remaining', function(){
            it('has elapsed time 0', function(){
              timey.startTimer(0);
              clockmock.elapseMillis(this.clock,3000);
              timey.reset();
              var result = timey.getTimeRemainingMillis();
              expect(result).toEqual(0);
            });
    });

    afterEach(function(){
        this.clock.restore();
    });
  });

  describe('pause/resume tests: ', function(){

    beforeEach(function(){
          this.clock = sinon.useFakeTimers();
        });

    describe('when timer is paused with time remaining', function(){
            it('time remaining is constant following elapses', function(){
          	  timey.startTimer(8000);
          	  timey.pause();
          	  clockmock.elapseMillis(this.clock,3000);
              var result = timey.getTimeRemainingMillis();
              expect(result).toEqual(8000);
            });
    });

    describe('when timer at time t is paused for 3 seconds, then resumed for 3 more', function(){
            it('time remaining is t - 3 seconds', function(){
          	  timey.startTimer(8000);
          	  timey.pause();
          	  clockmock.elapseMillis(this.clock,3000);
          	  timey.resume();
          	  clockmock.elapseMillis(this.clock,3000);
              var result = timey.getTimeRemainingMillis();
              expect(result).toEqual(5000);
            });
    });

    describe('when timer is paused, then reset', function(){
            it('time remaining is 0', function(){
          	  timey.startTimer(8000);
          	  timey.pause();
          	  clockmock.elapseMillis(this.clock,3000);
		  timey.reset();
          	  clockmock.elapseMillis(this.clock,3000);
              var result = timey.getTimeRemainingMillis();
              expect(result).toEqual(0);
            });
    });

    describe('when timer is paused, 3 seconds pass, and paused again', function(){
            it('time remaining is constant',function(){
          	  timey.startTimer(8000);
          	  timey.pause();
          	  clockmock.elapseMillis(this.clock,3000);
          	  timey.pause();
          	  clockmock.elapseMillis(this.clock,3000);
              var result = timey.getTimeRemainingMillis();
              expect(result).toEqual(8000);
            });
    });

    describe('when timer at time t is not paused, but resumed after 3 seconds, 3 seconds pass', function(){
            it('time remaining t - 6',function(){
          	  timey.startTimer(8000);
          	  clockmock.elapseMillis(this.clock,3000);
		  timey.resume();
          	  clockmock.elapseMillis(this.clock,3000);
              var result = timey.getTimeRemainingMillis();
              expect(result).toEqual(2000);
            });
    });

    afterEach(function(){
        this.clock.restore();
    });
  });

});