var wru = require('wru');
var collection = [];
var googleTranslate = require('./..');

collection.push({
	name: "Google translate",
	test: function() {
		wru.assert("Function exists", typeof googleTranslate == "function");

		googleTranslate("This need for translation", {from: "en", to: "ru"}, wru.async(function (error, result, others) {
			if (error) console.log(error.stack);
			wru.assert("translate (en -> ru)", result == "Это необходимо для перевода");
			wru.assert(error, !error);
		}));

		// var callback = wru.async(function(){...});
		googleTranslate("Москва", {from: "ru", to: "en"}, wru.async(function (error, result, others) {
			if (error) console.log(error.stack);
			wru.assert("translate (ru -> en)", result == "Moscow");
			wru.assert(error, !error);
		}));
	}
});


wru.test(collection);