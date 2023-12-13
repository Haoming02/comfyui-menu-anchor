import { app } from "../../scripts/app.js";
import { MODE } from "./configs.js";

function moveMenu() {
	const menu = document.querySelector(".comfy-menu");
	menu.classList.add('comfy-menu-manual-pos');

	switch (MODE) {
		default:
			menu.style.bottom = '0px';
			menu.style.right = '0px';
			break;

		case 1:
			menu.style.bottom = '0px';
			menu.style.left = '0px';
			break;

		case 2:
			menu.style.top = '0px';
			menu.style.left = '0px';
			break;

		case 3:
			menu.style.top = '0px';
			menu.style.right = '0px';
			break;
	}
}

app.registerExtension({
	name: "Comfy.MenuAnchor",
	async setup() {

		setTimeout(() => {
			moveMenu()
		}, 100);

	}
});
