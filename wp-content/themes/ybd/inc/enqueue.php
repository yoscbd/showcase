<?php
/**
 * Understrap enqueue scripts
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

if (!function_exists('understrap_scripts')) {
    /**
     * Load theme's JavaScript and CSS sources.
     */
    function understrap_scripts()
    {
        // Get the theme data.
        $the_theme = wp_get_theme();
        $theme_version = $the_theme->get('Version');
        $bootstrap_version = get_theme_mod('understrap_bootstrap_version', 'bootstrap4');
        $suffix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';

        // Grab asset urls.
        $theme_styles = "/css/theme{$suffix}.css";
        $theme_scripts = "/js/theme{$suffix}.js";
        if ('bootstrap4' === $bootstrap_version) {
            $theme_styles = "/css/theme-bootstrap4{$suffix}.css";
            $theme_scripts = "/js/theme-bootstrap4{$suffix}.js";
        }

        $css_version = $theme_version . '.' . filemtime(get_template_directory() . $theme_styles);
        wp_enqueue_style('understrap-styles', get_template_directory_uri() . $theme_styles, array(), $css_version);

        wp_enqueue_script('jquery');

        $js_version = $theme_version . '.' . filemtime(get_template_directory() . $theme_scripts);
        wp_enqueue_script('understrap-scripts', get_template_directory_uri() . $theme_scripts, array(), $js_version, true);
        if (is_singular() && comments_open() && get_option('thread_comments')) {
            wp_enqueue_script('comment-reply');
        }

        wp_localize_script('understrap-scripts', 'understrap_script_vars', array(
            'alert' => __('Hey2! You have clicked the button!', 'pippin'),
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('reg-nonce'),
            'root_url' => get_site_url(),
        )
        );
        wp_localize_script('understrap-scripts', 'globalData', array(
            'nonce' => wp_create_nonce('wp_rest'),
            'root_url' => get_site_url(),

        )
        );
    }
} // End of if function_exists( 'understrap_scripts' ).

add_action('wp_enqueue_scripts', 'understrap_scripts');

if (!function_exists('understrap_global_scripts')) {
    /**
     * Load theme's JavaScript and CSS sources.
     */
    function understrap_global_scripts()
    {
        wp_enqueue_script('understrap-global-scripts', get_template_directory_uri() . $theme_scripts, array(), $js_version, true);

        wp_localize_script('understrap-global-scripts', 'globalData', array(
            'nonce' => wp_create_nonce('wp_rest'),
            'root_url' => get_site_url(),

        )
        );
    }
} // End of if function_exists( 'understrap_scripts' ).
add_action('admin_enqueue_scripts', 'understrap_global_scripts');
