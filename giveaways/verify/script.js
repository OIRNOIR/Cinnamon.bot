let verified = false;

async function turnstileCallback (token) {
	if (verified) return;
	const status = document.getElementById("status-container");
	const urlParams = new URLSearchParams(window.location.search);
	let host;
	if (urlParams.has("h") && urlParams.get("h") == "beta") {
		host = "api-beta.cinnamon.bot";
	} else {
		host = "api.cinnamon.bot";
	}
	const res = await fetch("https://" + host + "/api/giveaways/verify", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({
		token,
		verifyKey: urlParams.get("v")
	})});
	const text = await res.text();
	if (String(res.status).startsWith("5")) status.innerText = "Internal Server Error. Please report this error.";
	else switch (res.status) {
		case 400: {
			status.innerText = "Verification Failed. Reason: " + text;
			break;
		}
		case 200: {
			status.innerText = "Verification Success! You may now return to Discord."
			break;
		}
		default: {
			status.innerText = "Unknown status code: " + res.status + ". If refreshing does not work, please report this error."
		}
	}
}