import { app } from "../../scripts/app.js";

app.ui.settings.addSetting({
	id: "anchor.mode",
	name: "Menu Anchor Mode",
	defaultValue: "Bottom-Right",
	type: "combo",
	options: [
		"Bottom-Right",
		"Bottom-Left",
		"Top-Left",
		"Top Right"
	]
});

app.ui.settings.addSetting({
	id: "anchor.always",
	name: "Menu Anchor Always",
	defaultValue: false,
	type: "boolean",
});

function move2corner(menu) {
	switch (app.ui.settings.getSettingValue("anchor.mode", "Bottom-Right")) {
		default:
			menu.style.top = 'unset';
			menu.style.left = 'unset';
			menu.style.bottom = '0px';
			menu.style.right = '0px';
			break;

		case "Bottom-Left":
			menu.style.top = 'unset';
			menu.style.right = 'unset';
			menu.style.bottom = '0px';
			menu.style.left = '0px';
			break;

		case "Top-Left":
			menu.style.bottom = 'unset';
			menu.style.right = 'unset';
			menu.style.top = '0px';
			menu.style.left = '0px';
			break;

		case "Top Right":
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

	if (!app.ui.settings.getSettingValue("anchor.always", false))
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
