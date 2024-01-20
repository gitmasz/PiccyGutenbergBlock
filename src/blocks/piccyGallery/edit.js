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
	BlockControls,
	useInnerBlocksProps
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	Icon
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { ImageThumbnail } from "../../components/imageThumbnail";

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
	const [editMode, setEditMode] = useState(true);
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: "piccy-gallery-inner-blocks"
		},
		{
			allowedBlocks: ["blockylicious/piccy-image"]
		}
	);
	const innerBlocks = useSelect(
		(select) => {
			const { getBlocksByClientId } = select("core/block-editor");
			const block = getBlocksByClientId(props.clientId)?.[0];
			return block?.innerBlocks;
		},
		[props.clientId]
	);
	const [previewModeImage, setPreviewModeImage] = useState({
		imageId: innerBlocks?.[0]?.attributes?.imageId,
		blockId: innerBlocks?.[0]?.clientId,
	});

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
			<div {...blockProps}>
				{!!editMode && (
					<div className='edit-mode'>
						<span className='piccy-label'>
							{__("Piccy image gallery", metadata.textdomain)}
						</span>
						<div {...innerBlocksProps}></div>
					</div>
				)}
				{!editMode && (
					<>
						<div className="preview-mode">
							{(innerBlocks || []).map((innerBlock) => (
								<ImageThumbnail
									key={innerBlock.clientId}
									imageId={innerBlock.attributes.imageId}
									height={75}
									onClick={() => {
										setPreviewModeImage({
											imageId: innerBlock.attributes.imageId,
											blockId: innerBlock.clientId,
										});
									}}
								/>
							))}
						</div>
						<div>
							<ImageThumbnail
								height="initial"
								imageId={previewModeImage?.imageId}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
}
