var http = require("https");
var querystring = require("querystring");

function googleTranslate(string, settings, callback) {
	"use strict";
	if (!settings) settings = {};
	if (!callback) callback = settings.callback;
	var from = settings.from || "ru";
	var to = settings.to || "en";

	var data = {
		client: "t",
		q: string,
		sl: from,
		tl: to,
		ie: "UTF-8",
		oe: "UTF-8",
		hl: from,
		dt: "t"
	};

	var options = {
		host: "translate.google.com",
		port: 443,
		method: "GET",
		headers: {
			"Referer": "https://translate.google.com/"
		},
		path: "/translate_a/single?" + querystring.stringify(data)
	};

	var body = "";

	var request = http.request(options, function(response) {
		response.setEncoding("utf8");
		response.on("data", function(chunk) {
			body += chunk.toString("utf8");
		});
		response.on("end", function() {
			var pos = body.indexOf("]]");
			body = body.substr(1, pos + 1);
			try {
				var json = JSON.parse(body);
			} catch (e) {
				var error = new Error(["JSON parse", e.name, e.message].join(", ") + ".");
				if (callback) {
					callback(error, false);
				}
				return;
			}
			var all = json[0];
			var result = all[0];
			// result = html_entity_decode(result, ent_quotes, "utf-8");
			if (callback) {
				callback(false, result, all);
			}
		});
	});

	request.on("error", function(e) {
		if (callback) callback(e, false);
	});

	request.end();

}

module.exports = googleTranslate;