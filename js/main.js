---
---

"use strict";

var $body = document.querySelector("body");
$body.classList.add("is-loading");

(function() {
	window.addEventListener("load", function() {
		$body.classList.remove("is-loading");
	});

	window.addEventListener("unload", function() {});

	var current_hours = (new Date()).getHours();
	if(current_hours >= 21 || current_hours < 8) {
		$body.classList.add("-dark");
		document.querySelector(".switch > input").checked = true;
	} else {
		document.querySelector(".switch > input").checked = false;
		$body.classList.remove("-dark");
	}

	(new Walkway({
		selector: "#lua-android",
		duration: 1000,
	})).draw();
})();

function toggleDarkness(event) {
	$body.classList.toggle("-dark");
	$body.classList.contains("-dark")
		? (new Walkway("#lua-inner-moon")).draw()
		: (new Walkway({
			selector: "#android",
			duration: 1500,
		})).draw();
}