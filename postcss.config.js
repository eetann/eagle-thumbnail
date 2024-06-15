/**
 * Transforms a CSS selector based on a given prefix.
 * @param {string} prefix - The prefix to apply to the selector.
 * @param {string} selector - The original CSS selector.
 * @param {string} prefixedSelector - The CSS selector with the prefix applied.
 * @returns {string} The transformed CSS selector.
 */
function transformSelector(prefix, selector, prefixedSelector) {
	// daisyUI: src/base/colors.css
	if (selector.match(/:root/)) {
		return selector.replace(/:root/, prefix);
	}

	// daisyUI: src/base/general.css
	if (selector.match(/html/)) {
		return selector.replace(/html/, prefix);
	}

	return prefixedSelector;
}

module.exports = {
	plugins: {
		tailwindcss: {},
		"postcss-prefix-selector": {
			prefix: "#crxEagleThumbnail",
			transform: transformSelector,
		},
		autoprefixer: {},
	},
};
