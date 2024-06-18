import "@/assets/app.css";
import App from "./App.svelte";
import { waitForElement } from "./waitForElement";

export default defineContentScript({
	matches: ["https://www.youtube.com/*"],
	async main(ctx) {
		if (!location.href.indexOf("watch")) {
			console.log("no watch");
			return;
		}
		console.log("hello content script");
		// TODO: ポップアップからも実行
		const anchor = await waitForElement("#secondary-inner");
		if (typeof anchor === "undefined") {
			return;
		}
		const ui = createIntegratedUi(ctx, {
			tag: "crx-eagle-thumbnail",
			position: "inline",
			anchor: anchor,
			append: "first",
			onMount: (container) => {
				container.id = "crxEagleThumbnail";
				const app = new App({
					target: container,
				});
				return app;
			},
			onRemove: (app) => {
				app?.$destroy();
			},
		});
		ui.mount();
	},
});
