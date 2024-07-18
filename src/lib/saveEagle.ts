import { storage } from "wxt/storage";
import {
	PATTERN_CHANNEL_NAME,
	PATTERN_VIDEO_TITLE,
	eagleItemTemplateStorage,
} from "./options";

async function postToEagle(
	itemTitle: string,
	imageURL: string,
	websiteURL: string,
	annotation: string,
) {
	const data = {
		type: "image",
		title: itemTitle,
		src: imageURL,
		url: websiteURL,
		// TODO: annotationが無効なのか拡張機能関係なくconsoleでAPIを叩いてみる
		// TODO: 無理ならクリップボードに入れるオプションを追加
		annotation: annotation,
	};
	// annotationだけ反映されないため、存在すればクリップボードに入れる
	if (annotation !== "") {
		try {
			const item = [
				new ClipboardItem({
					"text/plain": new Blob([annotation], { type: "text/plain" }),
				}),
			];
			await navigator.clipboard.write(item);
		} catch (e) {
			console.log("Failed to copy annotation text", e);
		}
	}

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

	const channelName =
		document
			.querySelector("span[itemprop='author'] link[itemprop='name']")
			?.getAttribute("content") ?? "";

	const { title: titleTemplate, annotation: annotationTemplate } =
		await eagleItemTemplateStorage.getValue();

	const itemTitle = titleTemplate
		.replace(PATTERN_VIDEO_TITLE, videoTitle.replace(/ - YouTube$/, ""))
		.replace(PATTERN_CHANNEL_NAME, channelName);
	const itemAnnotation = annotationTemplate
		.replace(PATTERN_VIDEO_TITLE, videoTitle.replace(/ - YouTube$/, ""))
		.replace(PATTERN_CHANNEL_NAME, channelName);

	await postToEagle(itemTitle, imageURL, websiteConvertedURL, itemAnnotation);
}
