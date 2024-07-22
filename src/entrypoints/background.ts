import { onMessage } from "@/lib/message";

export default defineBackground(() => {
	onMessage("openOptionsPage", () => {
		browser.runtime.openOptionsPage();
	});
});
