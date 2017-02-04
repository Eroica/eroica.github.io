---
---

"use strict";

(function() {
	var	$window = document.window,
	$body = document.getElementsByTagName("body")[0];

	$body.classList.toggle('is-loading');

	window.addEventListener("load", function() {
		$body.classList.toggle("is-loading");
	});

	window.addEventListener("unload", function() {});

	var date = new Date();
	var current_hours = date.getHours();

	if(current_hours >= 18 || current_hours < 8) {
		document.querySelector("body").classList.add("-dark");
		document.querySelector(".switch > input").checked = true;
	} else {
		document.querySelector(".switch > input").checked = false;
		document.querySelector("body").classList.remove("-dark");
	}

	var $lua_android = new Walkway("#lua-android");
	$lua_android.draw();
})();


function toggleDarkness(event) {
	var $body = document.querySelector("body");
	$body.classList.toggle("-dark");

	var s;
	if ($body.classList.contains("-dark")) {
		s = new Walkway("#lua-inner-moon");
	} else {
		s = new Walkway("#android");
	}
	s.draw();
}