/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
window.onload = () => {
	const galleries = Array.from(
		document.getElementsByClassName("wp-block-imaszpiccy-piccy-gallery")
	);

	galleries.forEach((gallery) => {
		const thumbnails = Array.from(gallery.getElementsByClassName("thumb"));
		if (thumbnails?.[0]) {
			thumbnails[0].classList.add("selected");
			const imagePreview = Array.from(
				gallery.getElementsByClassName("image-preview")
			);
			imagePreview[0].src = thumbnails[0].dataset.largeSize;
		}

		thumbnails.forEach((thumbnail) => {
			thumbnail.addEventListener("click", () => {
				const selected = Array.from(
					gallery.getElementsByClassName("thumb selected")
				);
				selected.forEach((image) => {
					image.classList.remove("selected");
				});
				thumbnail.classList.add("selected");
				const imagePreview = Array.from(
					gallery.getElementsByClassName("image-preview")
				);
				imagePreview[0].src = thumbnail.dataset.largeSize;
			});
		});
	});
};
/* eslint-enable no-console */
