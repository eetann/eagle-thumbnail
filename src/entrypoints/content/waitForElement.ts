export async function waitForElement(
	selector: string,
): Promise<Element | undefined> {
	return new Promise((resolve) => {
		let elm = document.querySelector(selector);
		if (elm) {
			console.log("最初に見つかった");
			return resolve(elm);
		}

		const timer = setInterval(() => {
			elm = document.querySelector(selector);
			if (elm) {
				clearInterval(timer);
				clearTimeout(timeout);
				console.log("途中で見つかった");
				return resolve(elm);
			}
		}, 500);
		const timeout = setTimeout(() => {
			clearInterval(timer);
			console.log("見つからなかった");
			return resolve(undefined);
		}, 10000);
	});
}
