import { app } from "../../scripts/app.js";
import { MODE, ALWAYS } from "./configs.js";

function move2corner(menu) {
	switch (MODE) {
		default:
			menu.style.top = 'unset';
			menu.style.left = 'unset';
			menu.style.bottom = '0px';
			menu.style.right = '0px';
			break;

		case 1:
			menu.style.top = 'unset';
			menu.style.right = 'unset';
			menu.style.bottom = '0px';
			menu.style.left = '0px';
			break;

		case 2:
			menu.style.bottom = 'unset';
			menu.style.right = 'unset';
			menu.style.top = '0px';
			menu.style.left = '0px';
			break;

		case 3:
			menu.style.bottom = 'unset';
			menu.style.left = 'unset';
			menu.style.top = '0px';
			menu.style.right = '0px';
			break;
	}
}

function moveMenu() {
	const menu = document.querySelector(".comfy-menu");
	menu.classList.add('comfy-menu-manual-pos');

	move2corner(menu);

	if (ALWAYS === 0)
		return;

	menu.addEventListener('mouseup', () => {
		setTimeout(() => {
			move2corner(menu);
		}, 50);
	});
}

app.registerExtension({
	name: "Comfy.MenuAnchor",
	async setup() {

		setTimeout(() => {
			moveMenu()
		}, 100);

	}
});
