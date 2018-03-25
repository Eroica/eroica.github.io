---
---

"use strict";

var $body = document.querySelector("body");

(function() {
	window.addEventListener("load", function() {
		$body.classList.remove("is-loading");
	});

	window.addEventListener("unload", function() {});

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