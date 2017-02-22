---
---

"use strict";

var $body = document.querySelector("body");
var $day = document.querySelector(".day-paragraph");
const DAY = "Have a nice day!";
const EVENING = "Have a nice evening!";

(function() {
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
		$day.innerText = EVENING;
	} else {
		document.querySelector(".switch > input").checked = false;
		document.querySelector("body").classList.remove("-dark");
	}

	var $lua_android = new Walkway("#lua-android");
	$lua_android.draw();
})();


function toggleDarkness(event) {
	$body.classList.toggle("-dark");

	$day.innerText = $body.classList.contains("-dark") ? EVENING : DAY;
	var s = $body.classList.contains("-dark")
			? new Walkway("#lua-inner-moon")
			: new Walkway("#android");
	s.draw();
}