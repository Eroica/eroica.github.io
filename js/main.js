---
---

"use strict";

var $body = document.querySelector("body");
var $day = document.querySelector(".day-paragraph");
const DAY = "Have a nice day!";
const EVENING = "Have a nice evening!";

(function() {
	$body.classList.toggle("is-loading");

	var current_hours = (new Date()).getHours();
	if(current_hours >= 21 || current_hours < 8) {
		document.querySelector("body").classList.add("-dark");
		document.querySelector(".switch > input").checked = true;
		if ($day != null) $day.innerText = EVENING;
	} else {
		document.querySelector(".switch > input").checked = false;
		document.querySelector("body").classList.remove("-dark");
	}

	(new Walkway({
		selector: "#lua-android",
		duration: 1000,
	})).draw();

	(new Walkway({
		selector: ".kotlin-logo",
		duration: 1000,
		easing: "linear",
	})).draw();
})();

function toggleDarkness(event) {
	$body.classList.toggle("-dark");

	if ($day != null) $day.innerText = $body.classList.contains("-dark") ? EVENING : DAY;
	$body.classList.contains("-dark")
		? (new Walkway("#lua-inner-moon")).draw()
		: (new Walkway({
			selector: "#android",
			duration: 1500,
		})).draw();
}