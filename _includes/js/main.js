var $body;
var $switch;

if (sessionStorage.getItem("dark") === "true") {
	document.querySelector("body").classList.add("-dark");
	document.querySelector("input[type='checkbox']").checked = true;
}

function toggleDarkness (event) {
	$body.classList.toggle("-dark");
	sessionStorage.setItem("dark", $switch.checked);
}

window.addEventListener("load", function () {
	$body = document.querySelector("body");
	$switch = document.querySelector("input[type='checkbox']");
	$body.classList.remove("is-loading");
	$body.classList.remove("no-js");
});
