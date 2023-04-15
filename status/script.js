async function refresh() {
	const statusIcons = document.getElementById('status-icons');
	let dataRes;
	try {
		dataRes = await fetch("https://api.cinnamon.bot/api/status/", {cache: "no-cache"});
	} catch {
		const element = document.createElement('div');
		element.classList.add("status-icon");
		element.innerText = "🔥";
		statusIcons.replaceChildren(element);
		return;
	}
	const data = await dataRes.json();
	let indicators = [];
	for (const shard of data) {
		const element = document.createElement("div");
		let letter = "";
		switch (shard.status) {
			case 0: {
				letter = " Q";
				break;
			}
			case 1: {
				letter = " L";
				break;
			}
			case 2: {
				letter = " P";
				break;
			}
			case 3: {
				letter = "";
				break;
			}
			default: {
				letter = " 🔥";
				break;
			}
		}
		element.classList.add("status-icon", `status-${shard.status}`);
		element.innerText = `${shard.id}${letter}`;
		indicators.push(element);
	}
	statusIcons.replaceChildren(...indicators);
}

document.addEventListener('DOMContentLoaded', async () => {
	refresh();
	let secondsUntilRefresh = 30;
	setInterval(async () => {
		secondsUntilRefresh--;
		if (secondsUntilRefresh <= 0) {
			secondsUntilRefresh = 30;
			refresh();
		}
		document.getElementById("durationUntilRefresh").innerText = secondsUntilRefresh;
	}, 1000);
});