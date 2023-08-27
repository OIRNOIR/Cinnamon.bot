async function loadStaff () {
	showdown.setOption("openLinksInNewWindow", true);
	showdown.setOption("simpleLineBreaks", true);
	showdown.setOption("simplifiedAutoLink", true);
	const converter = new showdown.Converter();
	let dataRes;
	try {
		dataRes = await fetch("https://api.cinnamon.bot/api/staff/");
	} catch {
		return alert("Cinnamon's staff page is not available at this time. Please try again later.");
	}
	const data = await dataRes.json();
	const categoryContainer = document.getElementById("staff-categories");

	for (const category of data) {
		const categoryElement = document.createElement("div");
		categoryElement.classList.add("staff-category");
		
		// Setup category title
		const categoryTitleElement = document.createElement("h1");
		categoryTitleElement.innerText = category.name;
		categoryTitleElement.classList.add("staff-category-title");
		categoryElement.appendChild(categoryTitleElement);

		// Setup individual cards
		const cardContainer = document.createElement("div");
		cardContainer.classList.add("staff-category-cards", "large-grid");
		
		for (const card of category.members) {
			const cardElement = document.createElement("div");
			cardElement.classList.add("staff-card");

			const details = document.createElement("div");
			details.classList.add("staff-card-details");

			const pfpElement = document.createElement("img");
			pfpElement.classList.add("staff-card-details-picture");
			pfpElement.setAttribute("src", card.avatarURL);
			details.appendChild(pfpElement);

			const textDetails = document.createElement("div");
			textDetails.classList.add("staff-card-details-text");

			const displayName = document.createElement("h2");
			displayName.classList.add("staff-card-details-name");
			displayName.innerText = card.displayName;
			textDetails.appendChild(displayName);
			
			const pomelo = document.createElement("p");
			pomelo.classList.add("staff-card-details-pomelo");
			const usernameLink = document.createElement("a");
			usernameLink.setAttribute("target", "_blank");
			usernameLink.setAttribute("rel", "noreferrer noopener");
			usernameLink.setAttribute("href", "https://discord.com/users/" + card.id);
			usernameLink.innerText = card.username;
			pomelo.appendChild(usernameLink);
			textDetails.appendChild(pomelo);

			const role = document.createElement("p");
			role.classList.add("staff-card-details-role");
			role.innerText = card.role;
			textDetails.appendChild(role);

			details.appendChild(textDetails);

			cardElement.appendChild(details);

			const aboutContainer = document.createElement("div");
			aboutContainer.classList.add("staff-card-about-container");

			const aboutContent = document.createElement("p");
			aboutContent.classList.add("staff-card-details-about", "content");
			aboutContent.innerHTML = converter.makeHtml(card.bio);
			aboutContainer.appendChild(aboutContent);

			cardElement.appendChild(aboutContainer);

			cardContainer.appendChild(cardElement);
		}

		categoryElement.appendChild(cardContainer);

		categoryContainer.appendChild(categoryElement);
	}
}