function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}

export async function getLargestImage(videoId: string) {
	const sizeList = [
		"maxresdefault", // 1280 x 720
		"sddefault", // 640 x 480
		"hqdefault", // 480 x 360
		"mqdefault", // 320 x 180
		"default", // 120 x 90
	];
	for (const size of sizeList) {
		const url = `https://img.youtube.com/vi/${videoId}/${size}.jpg`;

		try {
			const img = await loadImage(url);
			if (img.width > 120) {
				return url;
			}
		} catch (e) {}
	}
	return "";
}
