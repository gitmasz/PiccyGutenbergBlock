/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload
} from '@wordpress/block-editor';
import { useSelect } from "@wordpress/data";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
import metadata from "./block.json";

export default function Edit(props) {
	const blockProps = useBlockProps();
	const image = useSelect(
		(select) => {
			const data = select("core").getEntityRecord(
				"postType",
				"attachment",
				props.attributes.imageId
			);
			return data;
		},
		[props.attributes.imageId]
	);

	return (
		<>
			<div {...blockProps}>
				{!!props.attributes.imageId && !!image?.source_url && (
					<img
						style={{ height: 150, width: '100%', objectFit: "cover" }}
						src={image.source_url}
					/>
				)}
				<MediaUploadCheck>
					<MediaUpload
						allowedTypes={["image"]}
						render={({ open }) => {
							return (
								<button className="media-select" onClick={open}>
									{__("Select an image", metadata.textdomain)}
								</button>
							);
						}}
						value={props.attributes.imageId}
						onSelect={(item) => {
							props.setAttributes({
								imageId: item.id,
							});
						}}
					/>
				</MediaUploadCheck>
			</div>
		</>
	);
}
