export async function waitForElement(
	selector: string,
): Promise<Element | undefined> {
	// NOTE: https://phuoc.ng/collection/html-dom/waiting-for-an-element-to-become-available/
	// https://macarthur.me/posts/use-mutation-observer-to-handle-nodes-that-dont-exist-yet/
	// setIntervalだと要素が多いと大変っぽい
	return new Promise((resolve) => {
		const elm = document.querySelector(selector);
		if (elm) {
			resolve(elm);
			return;
		}
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.addedNodes.length === 0) {
					continue;
				}
				for (const node of mutation.addedNodes) {
					if (!(node instanceof HTMLElement)) continue;
					if (node.matches(selector)) {
						observer.disconnect();
						clearTimeout(timeout);
						resolve(node);
						return;
					}
				}
			}
			// const elm = document.querySelector(selector);
			// if (elm) {
			// 	observer.disconnect();
			//      clearTimeout(timeout);
			// 	resolve(elm);
			// 	return;
			// }
		});
		const timeout = setTimeout(() => {
			observer.disconnect();
			clearTimeout(timeout);
			resolve(undefined);
			return;
		}, 15000);
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}
