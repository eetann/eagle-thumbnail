import App from "./App.svelte";
import { waitForElement } from "./waitForElement";

export default defineContentScript({
	matches: ["https://www.youtube.com/*"],
	async main(ctx) {
		console.log("hello content script");
		// TODO: ポップアップからも実行
		const anchor = await waitForElement("#secondary-inner");
		if (typeof anchor === "undefined") {
			return;
		}
		const ui = createIntegratedUi(ctx, {
			position: "inline",
			anchor: anchor,
			append: "first",
			onMount: (container) => {
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
