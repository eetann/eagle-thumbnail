import "../../assets/app.css";
import App from "./App.svelte";
import { waitForElement } from "./waitForElement";

export default defineContentScript({
	matches: ["https://www.youtube.com/*"],
	cssInjectionMode: "ui",
	async main(ctx) {
		console.log("hello content script");
		// TODO: ポップアップからも実行
		const anchor = await waitForElement("#secondary-inner");
		if (typeof anchor === "undefined") {
			return;
		}
		const ui = await createShadowRootUi(ctx, {
			name: "eagle-thumbnail",
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
