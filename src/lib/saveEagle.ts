import { storage } from "wxt/storage";

// TODO: 必要なければ消す
const apiTokenStorage = storage.defineItem<string>("local:apiTokenStorage", {
	defaultValue: "",
});

export async function getApiToken() {
	return await apiTokenStorage.getValue();
}

export async function setApiToken(token: string) {
	return await apiTokenStorage.setValue(token);
}

async function postToEagle(
	itemTitle: string,
	imageURL: string,
	websiteURL: string,
) {
	const data = {
		type: "image",
		title: itemTitle,
		src: imageURL,
		url: websiteURL,
	};

	const requestOptions: RequestInit = {
		method: "POST",
		body: new URLSearchParams(data),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};

	const apiURL = "http://localhost:41593";
	try {
		await fetch(apiURL, requestOptions);
	} catch (e) {
		console.log("Failed to save Eagle", e);
	}
}

export async function save(
	videoTitle: string,
	imageURL: string,
	videoId: string,
) {
	// TODO: ここで再生リストのパラメータを消すかどうか分岐する
	const websiteConvertedURL = `https://www.youtube.com/watch?v=${videoId}`;

	const authorName =
		document
			.querySelector("span[itemprop='author'] link[itemprop='name']")
			?.getAttribute("content") ?? "";

	// TODO: オプションでメモにする
	const itemTitle = `${videoTitle.replace(/ - YouTube$/, "")} by ${authorName}`;

	await postToEagle(itemTitle, imageURL, websiteConvertedURL);
}
