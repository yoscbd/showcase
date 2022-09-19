<?php
/**
 * Plugin Name:       Ybd Blocks Package
 * Description:       Gutenberg Banner block nad offers block
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.5
 * Author:            Yossi Ben David
 * License:           GPL-2.0-or-later
 * Text Domain:       ybd-blocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_ybd_blocks_block_init()
{
    //register_block_type(__DIR__ . '/build/banner-block');
    register_block_type(__DIR__ . '/build/offers-block');

    register_block_type(__DIR__ . '/build/trial-block');

    register_block_type(__DIR__ . '/build/banner-block', array(
        'render_callback' => 'render_banner',
    ));

    register_block_type(__DIR__ . '/build/bullets-block', array(
        'render_callback' => 'ybd_content_render_latest_bullets_block',

    ));

}
add_action('init', 'create_block_ybd_blocks_block_init');

/*Banner block render function:*/

require_once plugin_dir_path(__FILE__) . 'render-banner.php';

/*notes\bullets block render function:*/

require_once plugin_dir_path(__FILE__) . 'render-bullets.php';