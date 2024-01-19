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
	BlockControls
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	Icon
} from "@wordpress/components";
import { useState } from "@wordpress/element";

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

export default function Edit() {
	const blockProps = useBlockProps();
	const [editMode, setEditMode] = useState(true);

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={
							editMode ? (
								<Icon icon="welcome-view-site" />
							) : (
								<Icon icon="edit" />
							)
						}
						label={
							editMode
								? __("Preview gallery", metadata.textdomain)
								: __("Edit gallery", metadata.textdomain)
						}
						onClick={() => {
							setEditMode((prevState) => !prevState)
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...blockProps}>Piccy Gallery</div>
		</>
	);
}
