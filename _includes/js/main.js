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
	$switch = document.querySelector("header input[type='checkbox']");
	$body.classList.remove("is-loading", "no-js");
});

document.getElementById("is_darkness").addEventListener("change", function (event) {
	toggleDarkness(event);
});

for (let figure of document.getElementsByTagName("figure")) {
	figure.addEventListener("click", (e) => {
		if (e.target.className == "a repeat-button") {
			const img = e.target.closest("figure").querySelector("img");
			const currentSrc = img.src;
			img.src = "";
			img.src = currentSrc;
		}
	});
}
