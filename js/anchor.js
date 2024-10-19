import { app } from "../../scripts/app.js";

app.ui.settings.addSetting({
	id: "Anchor.Mode.Horizontal",
	name: "Menu Anchor - Horizontal",
	defaultValue: "Off",
	type: "combo",
	options: [
		"Left",
		"Center",
		"Right"
	]
});

app.ui.settings.addSetting({
	id: "Anchor.Mode.Vertical",
	name: "Menu Anchor - Vertical",
	defaultValue: "Off",
	type: "combo",
	options: [
		"Top",
		"Center",
		"Bottom"
	]
});

/** @param {HTMLDivElement} menu  */
function move2corner(menu) {
	const handle = menu.querySelector("span.drag-handle");
	if (handle) handle.style.display = "none";

	const H = app.ui.settings.getSettingValue("Anchor.Mode.Horizontal", "Right");
	const V = app.ui.settings.getSettingValue("Anchor.Mode.Vertical", "Bottom");

	var x = 0, y = 0;

	switch (H) {
		default:
			break;
		case "Left":
			menu.style.left = '6em';
			menu.style.right = 'unset';
			x = 0;
			break;
		case "Center":
			menu.style.left = '50%';
			x = -50;
			menu.style.right = 'unset';
			break;
		case "Right":
			menu.style.left = 'unset';
			menu.style.right = '6em';
			x = 0;
			break;
	}

	switch (V) {
		default:
			break;
		case "Top":
			menu.style.top = '1em';
			menu.style.bottom = 'unset';
			y = 0;
			break;
		case "Center":
			menu.style.top = '50%';
			menu.style.bottom = 'unset';
			y = -50;
			break;
		case "Bottom":
			menu.style.top = 'unset';
			menu.style.bottom = '1em';
			y = 0;
			break;
	}

	menu.style.transform = `translate(${x}%, ${y}%)`;
}

function init() {
	[".comfy-menu", ".actionbar"].forEach((cls) => {
		const menu = document.querySelector(cls);
		if (menu == null)
			return;

		menu.classList.add('comfy-menu-manual-pos');

		document.addEventListener('mouseup', () => {
			setTimeout(() => move2corner(menu), 50);
		});

		setTimeout(() => move2corner(menu), 100);
	});
}

app.registerExtension({
	name: "Comfy.MenuAnchor",
	async setup() {
		init();
	}
});
