//load up the tests
var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

//see https://github.com/tnajdek/angular-requirejs-seed/blob/master/test/main-test.js
requirejs.config({
    // Karma serves files from '/base'
    // and somehow it knows the base of my project (probably by 
    // the basePath property in karma.conf.js
    baseUrl: '/base/js',

    //remember requirejs doesn't want .js suffixes
    //also we're using the mocks file that lives separately under test dir
    paths: {
	//none of these are under baseUrl, so specify separately
	clockmock: '/base/test/unit/testMock/clockmock',
	countdownTests : '/base/test/unit/serviceTests/countdownTests',
	elapsePastTimerEndTests : '/base/test/unit/serviceTests/elapsePastTimerEndTests',
	sinon: '/base/node_modules/sinon/pkg/sinon'
	//text
	//fixtures
    },

    //remember that shim only sets up relationships; still need to use require/define
    //http://requirejs.org/docs/api.html#config-shim
    shim: {
	'sinon' : {
	    'exports' : 'sinon'
	}
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
