<?php
/**
 * Plugin Name:       Ybd Display Custom Post Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.33
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ybd-display-custom-post-block
 *
 * @package           ybd-functions
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function ybd_functions_ybd_display_custom_post_block_block_init()
{
    register_block_type(__DIR__ . '/build', array(
        'render_callback' => 'ybd_content_render_latest_posts_block',
    ));
}
add_action('init', 'ybd_functions_ybd_display_custom_post_block_block_init');

function ybd_content_render_latest_posts_block($attributes)
{
    $numberOfColumns = $attributes['numberOfColumns'];
    $args = array(
        'posts_per_page' => $attributes['numberOfPosts'],
        'post_status' => 'publish',
        'order' => $attributes['order'],
        'orderby' => $attributes['orderBy'],
    );
    if (isset($attributes['categories'])) {
        $args['category__in'] = array_column($attributes['categories'], 'id');
    }
    $recent_posts = get_posts($args);

    $posts = '<div><ul ' . get_block_wrapper_attributes(['class' => "columns-" . $numberOfColumns]) . '>';
    foreach ($recent_posts as $post) {
        $title = get_the_title($post);
        $title = $title ? $title : __('(No title)', 'latest-posts');
        $permalink = get_permalink($post);
        $excerpt = get_the_excerpt($post);

        $posts .= '<li style="color:' . $attributes['itemsColor'] . '" class="columns-' . $numberOfColumns . '">';

        if ($attributes["displayFeaturedImage"] && has_post_thumbnail($post)) {
            $posts .= get_the_post_thumbnail($post, 'large');
        } else {
            $posts .= wp_get_attachment_image(65, 'large');
        }
        $posts .= '<h5><a href="' . esc_url($permalink) . '">' . $title . '</a></h5>';
        $posts .= '<time datetime="' . esc_attr(get_the_date('c', $post)) . '">' . esc_html(get_the_date('', $post)) . '</time>';

        if (!empty($excerpt)) {
            $posts .= '<p class="excerpt">' . $excerpt . '</p>';
        }

        $posts .= '</li>';
    }
    $posts .= '</ul></div>';

    return $posts;
}