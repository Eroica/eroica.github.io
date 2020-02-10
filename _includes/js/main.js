var $body;

function toggleDarkness (event) {
	$body.classList.toggle("-dark");
}

window.addEventListener("DOMContentLoaded", function () {
	$body = document.querySelector("body");
	$body.classList.remove("is-loading");
	$body.classList.remove("no-js");
});
