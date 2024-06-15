/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		theme: ["dim"],
		logs: false,
		// https://github.com/saadeghi/daisyui/blob/ff18801418e5992b107cf3d33e7d43aa86ade403/src/base/colors.css#L1C1-L5
		// themeRootではなくpostcss-prefix-selectorでprefixに変更する
		// vim viwgf: postcss.config.js
		// themeRoot: "#crxEagleThumbnail",
	},
};
