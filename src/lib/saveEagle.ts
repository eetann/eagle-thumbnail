import { storage } from "wxt/storage";

const apiTokenStorage = storage.defineItem<string>("local:apiTokenStorage", {
	defaultValue: "",
});

export async function getApiToken() {
	return await apiTokenStorage.getValue();
}

export async function setApiToken(token: string) {
	return await apiTokenStorage.setValue(token);
}

export async function save(name: string, url: string, website: string) {
	const apiToken = await getApiToken();
	if (apiToken === "") {
		throw new Error("set API Token");
	}
	const data = {
		token: apiToken,
		url,
		name,
		website,
		tags: [],
	};

	const requestOptions: RequestInit = {
		method: "POST",
		body: JSON.stringify(data),
		redirect: "follow",
	};

	const apiURL = "http://localhost:41595/api/item/addFromURL";
	fetch(apiURL, requestOptions)
		.then((response) => response.json())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
}
