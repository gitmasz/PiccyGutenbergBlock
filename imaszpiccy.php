<?php
/**
 * Plugin Name:       Piccy Block
 * Description:       Plugin with example Gutenberg block named Piccy scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Marcin Szczepkowski
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       imaszpiccy
 *
 * @package           create-block
 */

namespace iMaSzPlugins;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
final class iMaSzPiccy {
	static function init(){
		add_action( 'init', function(){
			register_block_type( __DIR__ . '/build/blocks/piccyGallery/' );
			register_block_type( __DIR__ . '/build/blocks/piccyImage/' );
		});
	}

	static function add_dashicons_stylesheet(){
		add_action( 'enqueue_block_assets', function(){
			wp_enqueue_style("dashicons");
		});
	}
}

iMaSzPiccy::init();