import { app } from "../../scripts/app.js";

app.ui.settings.addSetting({
	id: "Anchor.Mode.Horizontal",
	name: "Menu Anchor - Horizontal",
	defaultValue: "Off",
	type: "combo",
	options: ["Off", "Left", "Center", "Right"],
});

app.ui.settings.addSetting({
	id: "Anchor.Mode.Vertical",
	name: "Menu Anchor - Vertical",
	defaultValue: "Off",
	type: "combo",
	options: ["Off", "Top", "Center", "Bottom"],
});

/** @param {HTMLDivElement} menu  */
function move2corner(menu) {
	const handle = menu.querySelector("span.drag-handle");
	if (handle) handle.style.display = "none";

	const H = app.ui.settings.getSettingValue("Anchor.Mode.Horizontal", "Right");
	const V = app.ui.settings.getSettingValue("Anchor.Mode.Vertical", "Bottom");

	let x = 0, y = 0;

	switch (H) {
		default:
			menu.style.left = "unset";
			menu.style.right = "unset";
		case "Left":
			menu.style.left = "6em";
			menu.style.right = "unset";
			x = 0;
			break;
		case "Center":
			menu.style.left = "50%";
			x = -50;
			menu.style.right = "unset";
			break;
		case "Right":
			menu.style.left = "unset";
			menu.style.right = "6em";
			x = 0;
			break;
	}

	switch (V) {
		default:
			menu.style.top = "unset";
			menu.style.bottom = "unset";
		case "Top":
			menu.style.top = "1em";
			menu.style.bottom = "unset";
			y = 0;
			break;
		case "Center":
			menu.style.top = "50%";
			menu.style.bottom = "unset";
			y = -50;
			break;
		case "Bottom":
			menu.style.top = "unset";
			menu.style.bottom = "1em";
			y = 0;
			break;
	}

	menu.style.transform = `translate(${x}%, ${y}%)`;
}

function newFrontEnd(attempt) {
	const panel = document.querySelector("div.p-panel.p-component.actionbar");
	if (panel == null || panel.querySelector(".comfyui-queue-button") == null) {
		if (attempt < 10) setTimeout(() => newFrontEnd(attempt + 1), 100);
		return;
	}

	panel.classList.add("fixed", "shadow-interface");
	panel.classList.remove("p-0", "static", "mr-2", "border-none", "bg-transparent");

	window.addEventListener("resize", () => {
		setTimeout(() => move2corner(panel), 50);
	});

	move2corner(panel);
}

function init() {
	[".comfy-menu", ".actionbar"].forEach((cls) => {
		const menu = document.querySelector(cls);
		if (menu == null) return;

		menu.classList.add("comfy-menu-manual-pos");
		menu.classList.remove("is-docked");

		window.addEventListener("resize", () => {
			setTimeout(() => move2corner(menu), 50);
		});

		setTimeout(() => move2corner(menu), 50);
	});

	newFrontEnd(0);
}

app.registerExtension({
	name: "Comfy.MenuAnchor",
	async setup() {
		init();
	},
});
