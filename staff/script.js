document.addEventListener('DOMContentLoaded', async () => {
	const dataRes = await fetch("https://api-beta.cinnamon.bot/api/staff");
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

			const username = document.createElement("h2");
			username.classList.add("staff-card-details-name");
			const usernameLink = document.createElement("a");
			usernameLink.setAttribute("target", "_blank");
			usernameLink.setAttribute("rel", "noreferrer noopener");
			usernameLink.setAttribute("href", "https://discord.com/users/" + card.id);
			usernameLink.innerText = card.username;
			username.appendChild(usernameLink);
			textDetails.appendChild(username);

			const role = document.createElement("p");
			role.classList.add("staff-card-details-role");
			role.innerText = card.role;
			textDetails.appendChild(role);

			details.appendChild(textDetails);

			cardElement.appendChild(details);

			cardContainer.appendChild(cardElement);
		}

		categoryElement.appendChild(cardContainer);

		categoryContainer.appendChild(categoryElement);
	}
});