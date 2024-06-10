import App from "./App.svelte";
import { waitForElement } from "./waitForElement";

export default defineContentScript({
	matches: ["https://*.google.co.jp/*"],
	async main(ctx) {
		const anchor = await waitForElement("[role='navigation']");
		const ui = createIntegratedUi(ctx, {
			position: "overlay",
			alignment: "top-right",
			anchor: anchor,
			append: "after",
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
