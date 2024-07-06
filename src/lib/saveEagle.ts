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

export async function save(name: string, srcURL: string, websiteURL: string) {
	const data = {
		type: "image",
		title: name,
		src: srcURL,
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
	fetch(apiURL, requestOptions)
		.then((response) => response.json())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
}
